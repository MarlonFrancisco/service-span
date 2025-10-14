export class ValidationCodeDto {
  code: string;
  email?: string;
  telephone?: string;

  constructor(data: Partial<ValidationCodeDto>) {
    Object.assign(this, data);
  }
}
