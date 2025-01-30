import { Type } from 'class-transformer';
import { 
  IsString, 
  MaxLength, 
  IsOptional, 
  ValidateNested,
  IsArray,
} from 'class-validator';
import { OrganizationDto } from './shared/organization.dto';
import { ProfileDto } from './shared/profile.dto';
import { EmailDto } from './shared/email.dto'
import { PhoneDto } from './shared/phone.dto'
import { MetadataDto } from './shared/metadata.dto'
import { PasswordDto } from './shared/password.dto'
import { HashedPasswordDto } from './shared/hashed-password.dto'
import { IdpLinkDto } from './shared/idp-link.dto'

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(200)
  userId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  username?: string;

  @ValidateNested()
  @Type(() => OrganizationDto)
  @IsOptional()
  organization?: OrganizationDto;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MetadataDto)
  @IsOptional()
  metadata?: MetadataDto[];

  @ValidateNested() 
  @Type(() => PasswordDto)
  password: PasswordDto;

  @ValidateNested()
  @Type(() => HashedPasswordDto)
  @IsOptional()
  hashedPassword?: HashedPasswordDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdpLinkDto)
  @IsOptional()
  idpLinks?: IdpLinkDto[];

  @IsString()
  @IsOptional()
  @MaxLength(200)
  totpSecret?: string;
}
