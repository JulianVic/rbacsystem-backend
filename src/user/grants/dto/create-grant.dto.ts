import { IsArray, IsString } from 'class-validator';

export class CreateGrantDto {
  @IsString()
  projectId: string;

  @IsString()
  projectGrantId: string;

  @IsArray()
  @IsString({ each: true })
  roleKeys: string[];
}
