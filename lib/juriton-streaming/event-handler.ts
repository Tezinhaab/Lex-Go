export type EventType = 
  | "raw_model_stream_event"
  | "run_item_stream_event"
  | "tool_call_event"
  | "tool_output_event"
  | "message_complete"
  | "reasoning_event";

export interface JuritonStreamEvent {
  type: EventType;
  data: any;
  timestamp: Date;
}

export class JuritonEventHandler {
  private listeners: Map<EventType, ((event: JuritonStreamEvent) => void)[]> = new Map();

  on(eventType: EventType, callback: (event: JuritonStreamEvent) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)?.push(callback);
  }

  emit(eventType: EventType, data: any) {
    const event: JuritonStreamEvent = {
      type: eventType,
      data,
      timestamp: new Date(),
    };
    
    const callbacks = this.listeners.get(eventType) || [];
    callbacks.forEach((callback) => callback(event));
  }

  async handleStream(stream: AsyncIterable<any>, onChunk: (text: string) => void) {
    let fullContent = "";
    
    for await (const event of stream) {
      if (event.type === "raw_model_stream_event" && event.data?.type === "model") {
        const content = event.data?.event?.choices?.[0]?.delta?.content;
        if (content) {
          fullContent += content;
          onChunk(content);
          this.emit("raw_model_stream_event", { content, full: fullContent });
        }
      } else if (event.type === "raw_model_stream_event" && event.data?.event?.choices?.[0]?.delta?.reasoning) {
        const reasoning = event.data.event.choices[0].delta.reasoning;
        this.emit("reasoning_event", { reasoning });
      } else if (event.type === "run_item_stream_event" && event.item?.type === "tool_call_item") {
        this.emit("tool_call_event", {
          name: event.item.rawItem?.name,
          arguments: event.item.rawItem?.arguments,
        });
      }
    }
    
    return fullContent;
  }
}
