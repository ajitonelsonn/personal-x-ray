// types/together.d.ts
declare module "together-ai" {
  export interface CompletionCreateParams {
    model: string;
    messages: Array<{
      role: "system" | "user" | "assistant";
      content:
        | string
        | Array<{
            type: "text" | "image_url";
            text?: string;
            image_url?: {
              url: string;
            };
          }>;
    }>;
    max_tokens: number;
    temperature?: number;
    top_p?: number;
    top_k?: number;
    repetition_penalty?: number;
  }

  export interface CompletionResponse {
    choices: Array<{
      message: {
        content: string;
      };
    }>;
  }

  export default class Together {
    constructor(options: { apiKey: string });
    chat: {
      completions: {
        create(params: CompletionCreateParams): Promise<CompletionResponse>;
      };
    };
  }
}
