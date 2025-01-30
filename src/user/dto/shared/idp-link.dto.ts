import { IsString, MaxLength } from "class-validator";

export class IdpLinkDto {
    @IsString()
    @MaxLength(200)
    idpId: string;
  
    @IsString()
    @MaxLength(200)
    userId: string;
  
    @IsString()
    @MaxLength(200)
    userName: string;
  }