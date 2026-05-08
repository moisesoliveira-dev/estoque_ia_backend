export class StripeMapper {
    static toInternalPayment(stripePayment: Record<string, unknown>): Record<string, unknown> {
        return {
            externalId: stripePayment['id'],
            amount: stripePayment['amount'],
            currency: stripePayment['currency'],
            status: stripePayment['status'],
        };
    }
}
