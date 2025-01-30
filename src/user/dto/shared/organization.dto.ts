import { IsString, IsOptional } from 'class-validator'
export class OrganizationDto {
    @IsString()
    @IsOptional()
    orgId?: string;
  
    @IsString()
    @IsOptional()
    orgDomain?: string;
  }