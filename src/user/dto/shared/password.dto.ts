import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
export class PasswordDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    password: string;
  
    @IsBoolean()
    @IsOptional()
    changeRequired?: boolean;
  }