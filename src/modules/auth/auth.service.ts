import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);

        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateTokens(user.id, user.email, user.roles);
    }

    async refreshToken(token: string) {
        try {
            const payload = this.jwtService.verify<JwtPayload>(token, {
                secret: this.configService.get<string>('jwt.refreshSecret'),
            });

            return this.generateTokens(payload.sub, payload.email, payload.roles);
        } catch {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }

    private generateTokens(userId: string, email: string, roles: string[]) {
        const payload: JwtPayload = { sub: userId, email, roles };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('jwt.refreshSecret'),
            expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
        });

        return { accessToken, refreshToken };
    }
}
