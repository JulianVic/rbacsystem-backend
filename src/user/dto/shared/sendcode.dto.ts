import { IsOptional, IsString, MaxLength } from 'class-validator' 
export class SendCodeDto {
    @IsString()
    @IsOptional()
    @MaxLength(200)
    urlTemplate?: string;
}