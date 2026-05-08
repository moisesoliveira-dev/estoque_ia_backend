import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function seedAdmin(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository('users');

    const existing = await userRepository.findOne({ where: { email: 'admin@example.com' } });

    if (existing) {
        console.log('Admin user already exists, skipping seed.');
        return;
    }

    const hashedPassword = await bcrypt.hash('Admin@123456', 10);

    await userRepository.save({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        roles: ['admin', 'user'],
        is_active: true,
    });

    console.log('Admin user created successfully.');
}
