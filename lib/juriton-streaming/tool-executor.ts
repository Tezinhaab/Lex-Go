import type { z } from "zod";

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: z.ZodSchema;
  execute: (params: any) => Promise<string>;
}

export class JuritonToolExecutor {
  private tools: Map<string, ToolDefinition> = new Map();

  register(tool: ToolDefinition) {
    this.tools.set(tool.name, tool);
  }

  getToolDefinitions() {
    return Array.from(this.tools.values()).map((tool) => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      },
    }));
  }

  async execute(toolName: string, params: any): Promise<string> {
    const tool = this.tools.get(toolName);
    if (!tool) {
      throw new Error(`Tool ${toolName} not found`);
    }

    const validated = tool.parameters.parse(params);
    return await tool.execute(validated);
  }

  getTool(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }
}
