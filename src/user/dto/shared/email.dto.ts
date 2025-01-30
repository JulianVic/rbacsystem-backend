import { Type } from 'class-transformer'
import { IsString, IsNotEmpty, ValidateNested, MaxLength, IsOptional, IsBoolean } from 'class-validator'
import { SendCodeDto } from './sendcode.dto';
export class EmailDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    email: string;
  
    @ValidateNested()
    @Type(() => SendCodeDto)
    @IsOptional()
    sendCode?: SendCodeDto;

    @IsBoolean()
    @IsOptional()
    isVerified?: boolean;
}
  