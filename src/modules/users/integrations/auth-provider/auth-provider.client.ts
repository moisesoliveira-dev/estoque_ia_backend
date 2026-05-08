import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../../../../common/http/http.service';

@Injectable()
export class AuthProviderClient {
    private readonly logger = new Logger(AuthProviderClient.name);

    constructor(private readonly httpService: HttpService) { }

    async getUser(externalId: string): Promise<Record<string, unknown>> {
        this.logger.debug(`Fetching user from auth provider: ${externalId}`);
        // TODO: implement external auth provider call
        return {};
    }
}
