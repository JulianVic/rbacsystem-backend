import { IsBase64, IsNotEmpty, IsString, MaxLength } from "class-validator"	
export class MetadataDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    key: string;
  
    @IsString()
    @IsNotEmpty()
    @IsBase64()
    @MaxLength(500000)
    value: string;
  }