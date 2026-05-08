import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(8)
    @IsOptional()
    password?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsString({ each: true })
    @IsOptional()
    roles?: string[];
}
