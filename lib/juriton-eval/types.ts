export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type MessageList = Message[];

export interface SamplerResponse {
  response_text: string;
  actual_queried_message_list: MessageList;
  response_metadata: Record<string, any>;
}

export interface SingleEvalResult {
  score: number | null;
  metrics: Record<string, number>;
  html?: string;
  convo?: MessageList;
  example_level_metadata?: Record<string, any>;
}

export interface EvalResult {
  score: number | null;
  metrics: Record<string, number>;
  htmls: string[];
  convos: MessageList[];
  metadata?: Record<string, any>;
}
