import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '../../../../common/http/http.service';

@Injectable()
export class GroqClient {
    private readonly logger = new Logger(GroqClient.name);
    private readonly baseUrl = 'https://api.groq.com/openai/v1';
    private readonly apiKey: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.apiKey = this.configService.getOrThrow<string>('GROQ_API_KEY');
    }

    async chat(
        messages: { role: string; content: string }[],
        model = 'llama3-70b-8192',
    ): Promise<string> {
        this.logger.debug(`Groq chat request - model: ${model}`);
        // TODO: implement Groq API call
        return '';
    }
}
