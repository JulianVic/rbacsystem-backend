import { Type } from 'class-transformer';
import { 
  IsString, 
  MaxLength, 
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { ProfileDto } from './shared/profile.dto';
import { EmailDto } from './shared/email.dto';
import { PhoneDto } from './shared/phone.dto';
import { PasswordUpdateDto } from './shared/password-update.dto';

export class UpdateUserDto {
  @IsString()
  @MaxLength(200)
  username: string;

  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;

  @ValidateNested()
  @Type(() => EmailDto)
  email: EmailDto;

  @ValidateNested()
  @Type(() => PhoneDto)
  @IsOptional()
  phone?: PhoneDto;

  @ValidateNested()
  @Type(() => PasswordUpdateDto)
  @IsOptional()
  password?: PasswordUpdateDto;
}
