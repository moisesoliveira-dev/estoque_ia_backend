import { Module } from '@nestjs/common';
import { HttpModule } from '../../common/http/http.module';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { StripeClient } from './integrations/stripe/stripe.client';
import { AsaasClient } from './integrations/asaas/asaas.client';

@Module({
    imports: [HttpModule],
    controllers: [BillingController],
    providers: [BillingService, StripeClient, AsaasClient],
    exports: [BillingService],
})
export class BillingModule { }
