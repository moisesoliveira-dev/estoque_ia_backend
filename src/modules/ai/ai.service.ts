import { Injectable } from '@nestjs/common';
import { OpenAiClient } from './integrations/openai/openai.client';
import { GroqClient } from './integrations/groq/groq.client';

@Injectable()
export class AiService {
    constructor(
        private readonly openAiClient: OpenAiClient,
        private readonly groqClient: GroqClient,
    ) { }

    async chatWithOpenAi(prompt: string): Promise<string> {
        return this.openAiClient.chat([{ role: 'user', content: prompt }]);
    }

    async chatWithGroq(prompt: string): Promise<string> {
        return this.groqClient.chat([{ role: 'user', content: prompt }]);
    }
}
