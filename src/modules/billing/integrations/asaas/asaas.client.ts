import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '../../../../common/http/http.service';

@Injectable()
export class AsaasClient {
    private readonly logger = new Logger(AsaasClient.name);
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.baseUrl = this.configService.get<string>('ASAAS_BASE_URL') ?? 'https://sandbox.asaas.com/api/v3';
        this.apiKey = this.configService.getOrThrow<string>('ASAAS_API_KEY');
    }

    async createCharge(customerId: string, value: number): Promise<Record<string, unknown>> {
        this.logger.debug(`Creating Asaas charge for customer: ${customerId}`);
        // TODO: implement Asaas API call
        return {};
    }
}
