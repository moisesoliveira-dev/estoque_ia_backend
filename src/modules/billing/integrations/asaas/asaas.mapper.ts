export class AsaasMapper {
    static toInternalCharge(asaasCharge: Record<string, unknown>): Record<string, unknown> {
        return {
            externalId: asaasCharge['id'],
            value: asaasCharge['value'],
            netValue: asaasCharge['netValue'],
            status: asaasCharge['status'],
            dueDate: asaasCharge['dueDate'],
        };
    }
}
