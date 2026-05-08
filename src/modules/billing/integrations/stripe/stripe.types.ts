export type StripePaymentStatus =
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_action'
    | 'processing'
    | 'succeeded'
    | 'canceled';

export interface StripePaymentIntent {
    id: string;
    amount: number;
    currency: string;
    status: StripePaymentStatus;
    client_secret: string;
}

export interface StripeCustomer {
    id: string;
    email: string;
    name?: string;
}
