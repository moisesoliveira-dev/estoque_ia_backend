import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '../../../../common/http/http.service';

@Injectable()
export class StripeClient {
    private readonly logger = new Logger(StripeClient.name);
    private readonly baseUrl = 'https://api.stripe.com/v1';
    private readonly secretKey: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.secretKey = this.configService.getOrThrow<string>('STRIPE_SECRET_KEY');
    }

    async createPaymentIntent(amount: number, currency: string): Promise<Record<string, unknown>> {
        this.logger.debug(`Creating payment intent: ${amount} ${currency}`);
        // TODO: implement Stripe API call
        return {};
    }

    async createCustomer(email: string): Promise<Record<string, unknown>> {
        this.logger.debug(`Creating Stripe customer for: ${email}`);
        // TODO: implement Stripe API call
        return {};
    }
}
