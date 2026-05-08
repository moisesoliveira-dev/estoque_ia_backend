import { Module } from '@nestjs/common';
import { HttpModule } from '../../common/http/http.module';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { OpenAiClient } from './integrations/openai/openai.client';
import { GroqClient } from './integrations/groq/groq.client';

@Module({
    imports: [HttpModule],
    controllers: [AiController],
    providers: [AiService, OpenAiClient, GroqClient],
    exports: [AiService],
})
export class AiModule { }
