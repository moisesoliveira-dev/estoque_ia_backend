export interface UserResponse {
    id: string;
    name: string;
    email: string;
    roles: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
