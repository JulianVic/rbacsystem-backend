import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    roleKey: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    displayName: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    group?: string;
}
