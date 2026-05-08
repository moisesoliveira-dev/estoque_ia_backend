export class GroqMapper {
    static extractContent(response: Record<string, unknown>): string {
        const choices = response['choices'] as Array<Record<string, unknown>>;
        const message = choices?.[0]?.['message'] as Record<string, unknown>;
        return (message?.['content'] as string) ?? '';
    }
}
