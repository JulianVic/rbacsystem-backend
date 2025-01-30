import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsOptional } from 'class-validator'
export class HashedPasswordDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    hash: string;

    @IsBoolean()
    @IsOptional()
    changeRequired?: boolean;
}