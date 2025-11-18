import { Agent, run } from "@openai/agents";
import { JuritonEventHandler } from "@/lib/juriton-streaming/event-handler";
import { JuritonToolExecutor } from "@/lib/juriton-streaming/tool-executor";
import { legalToolsRegistry } from "@/lib/juriton-tools/legal-tools-registry";

export interface LegalAgentConfig {
  model: string;
  apiKey?: string;
  baseURL?: string;
  streaming?: boolean;
}

export class LegalAgent {
  private agent: Agent;
  private eventHandler: JuritonEventHandler;
  private toolExecutor: JuritonToolExecutor;

  constructor(config: LegalAgentConfig) {
    this.eventHandler = new JuritonEventHandler();
    this.toolExecutor = legalToolsRegistry.getExecutor();

    const toolDefinitions = this.toolExecutor.getToolDefinitions();

    this.agent = new Agent({
      name: "Juriton",
      instructions: `Você é Juriton, uma IA especializada em Direito Brasileiro. 
Sua expertise inclui:
- Redação de documentos jurídicos (minutas, petições, contestações)
- Análise de legislação brasileira
- Busca e interpretação de jurisprudências
- Consultoria jurídica geral

Sempre cite artigos de lei, jurisprudências relevantes e seja preciso nas recomendações.
Mantenha tom profissional mas acessível.`,
      tools: toolDefinitions,
      model: config.model,
    });
  }

  async chat(message: string, conversationHistory: any[] = []) {
    const result = await run(this.agent, message, {
      stream: true,
      conversationHistory,
    });

    let fullResponse = "";

    for await (const event of result) {
      if (event.type === "raw_model_stream_event" && event.data?.type === "model") {
        const content = event.data?.event?.choices?.[0]?.delta?.content;
        if (content) {
          fullResponse += content;
          this.eventHandler.emit("raw_model_stream_event", { content });
        }
      } else if (event.type === "run_item_stream_event" && event.item?.type === "tool_call_item") {
        const toolName = event.item.rawItem?.name;
        const toolArgs = JSON.parse(event.item.rawItem?.arguments || "{}");
        
        this.eventHandler.emit("tool_call_event", { name: toolName, arguments: toolArgs });

        try {
          const toolResult = await this.toolExecutor.execute(toolName, toolArgs);
          fullResponse += `\n\n[${toolName} executado com sucesso]\n${toolResult}`;
          this.eventHandler.emit("tool_output_event", { name: toolName, output: toolResult });
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
          this.eventHandler.emit("tool_output_event", { name: toolName, error: errorMsg });
        }
      }
    }

    // Simulate streaming response with legal tools
    const tools = this.toolExecutor.getToolDefinitions();
    
    for (const tool of tools) {
      if (message.toLowerCase().includes(tool.function.name.replace(/_/g, " "))) {
        const toolName = tool.function.name;
        this.eventHandler.emit("tool_call_event", { name: toolName });

        try {
          const toolResult = await this.toolExecutor.execute(toolName, { query: message });
          fullResponse = toolResult;
          this.eventHandler.emit("tool_output_event", { name: toolName, output: toolResult });
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
          this.eventHandler.emit("tool_output_event", { name: toolName, error: errorMsg });
        }
        break;
      }
    }

    if (!fullResponse) {
      fullResponse = `Você perguntou sobre: ${message}\n\nPara ajudar melhor, use os comandos: buscar jurisprudência, gerar documento, explicar lei ou analisar caso.`;
    }

    this.eventHandler.emit("message_complete", { fullResponse });
    return fullResponse;
  }

  onEvent(eventType: string, callback: (event: any) => void) {
    this.eventHandler.on(eventType as any, callback);
  }
}
