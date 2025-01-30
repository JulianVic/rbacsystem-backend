import { IsString, IsNotEmpty, MaxLength, IsOptional, ValidateNested } from 'class-validator';
import { PasswordDto } from './password.dto';
import { HashedPasswordDto } from './hashed-password.dto';
import { Type } from 'class-transformer';

export class PasswordUpdateDto {
    
    @ValidateNested()
    @Type(() => PasswordDto)
    @IsOptional()
    password?: PasswordDto;
    
    @ValidateNested()
    @Type(() => HashedPasswordDto)
    @IsOptional()
    hashedPassword?: HashedPasswordDto;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    currentPassword: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @IsOptional()
    verificationCode?: string;
} 