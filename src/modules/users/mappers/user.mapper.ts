import { User } from '../entities/user.entity';
import { UserResponse } from '../interfaces/user-response.interface';

export class UserMapper {
    static toResponse(user: User): UserResponse {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    static toResponseList(users: User[]): UserResponse[] {
        return users.map((u) => UserMapper.toResponse(u));
    }
}
