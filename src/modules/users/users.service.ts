import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async findAll(): Promise<User[]> {
        return this.usersRepository.findAll();
    }

    async findById(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id);
        if (!user) throw new NotFoundException(`User ${id} not found`);
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findByEmail(email);
    }

    async create(dto: CreateUserDto): Promise<User> {
        const existing = await this.usersRepository.findByEmail(dto.email);
        if (existing) throw new ConflictException('Email already in use');

        const hashed = await bcrypt.hash(dto.password, 10);
        return this.usersRepository.save({ ...dto, password: hashed });
    }

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        await this.findById(id);

        const data: Partial<User> = { ...dto };

        if (dto.password) {
            data.password = await bcrypt.hash(dto.password, 10);
        }

        const updated = await this.usersRepository.update(id, data);
        return updated!;
    }

    async remove(id: string): Promise<void> {
        await this.findById(id);
        await this.usersRepository.remove(id);
    }
}
