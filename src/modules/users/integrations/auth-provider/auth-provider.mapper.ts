import { User } from '../../entities/user.entity';

export class AuthProviderMapper {
    static fromExternalUser(externalUser: Record<string, unknown>): Partial<User> {
        return {
            email: externalUser['email'] as string,
            name: externalUser['name'] as string,
        };
    }
}
