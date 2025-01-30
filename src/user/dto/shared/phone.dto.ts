import { IsString, IsOptional, MaxLength, IsBoolean, ValidateNested } from 'class-validator'
import { SendCodeDto } from './sendcode.dto';
import { Type } from 'class-transformer';
export class PhoneDto {
    @IsString()
    @IsOptional()
    @MaxLength(200)
    phone?: string;

    @ValidateNested()
    @Type(() => SendCodeDto)
    @IsOptional()
    sendCode?: SendCodeDto;

    @IsBoolean()
    @IsOptional()
    isVerified?: boolean;
  }