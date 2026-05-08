import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '../../../../common/http/http.service';

@Injectable()
export class OpenAiClient {
    private readonly logger = new Logger(OpenAiClient.name);
    private readonly baseUrl = 'https://api.openai.com/v1';
    private readonly apiKey: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.apiKey = this.configService.getOrThrow<string>('OPENAI_API_KEY');
    }

    async chat(messages: { role: string; content: string }[], model = 'gpt-4o'): Promise<string> {
        this.logger.debug(`OpenAI chat request - model: ${model}`);
        // TODO: implement OpenAI API call
        return '';
    }

    async embeddings(input: string, model = 'text-embedding-3-small'): Promise<number[]> {
        this.logger.debug(`OpenAI embeddings request - model: ${model}`);
        // TODO: implement OpenAI embeddings call
        return [];
    }
}
