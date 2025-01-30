import { IsString, IsNotEmpty, MaxLength, IsOptional, IsEnum } from 'class-validator'
import { Gender } from './gender.enum'
export class ProfileDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    givenName: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    familyName: string;
  
    @IsString()
    @IsOptional()
    @MaxLength(200)
    nickName?: string;
  
    @IsString()
    @IsOptional()
    @MaxLength(200)
    displayName?: string;
  
    @IsString()
    @IsOptional()
    @MaxLength(10)
    preferredLanguage?: string;
  
    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender = Gender.GENDER_UNSPECIFIED;
}