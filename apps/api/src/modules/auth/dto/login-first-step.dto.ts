import { IsEmail, IsOptional, IsString, ValidateIf } from 'class-validator';

export class LoginFirstStepDto {
  @IsEmail()
  @IsOptional()
  @ValidateIf((o) => !o.telephone || o.email)
  email?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => !o.email || o.telephone)
  telephone?: string;
}
