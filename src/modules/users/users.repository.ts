import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.repo.find();
    }

    findById(id: string): Promise<User | null> {
        return this.repo.findOneBy({ id });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repo
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
    }

    save(user: Partial<User>): Promise<User> {
        return this.repo.save(user);
    }

    async update(id: string, data: Partial<User>): Promise<User | null> {
        await this.repo.update(id, data);
        return this.findById(id);
    }

    async remove(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}
