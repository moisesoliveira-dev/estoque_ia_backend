import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role, Roles } from '../../common/constants/roles.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './mappers/user.mapper';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @Roles(Role.Admin)
    async findAll() {
        const users = await this.usersService.findAll();
        return UserMapper.toResponseList(users);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findById(id);
        return UserMapper.toResponse(user);
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        const user = await this.usersService.create(dto);
        return UserMapper.toResponse(user);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        const user = await this.usersService.update(id, dto);
        return UserMapper.toResponse(user);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
