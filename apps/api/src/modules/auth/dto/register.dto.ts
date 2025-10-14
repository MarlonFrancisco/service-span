export class RegisterDto {
  email: string;
  telephone: string;
  firstName: string;
  lastName: string;
  acceptedTerms: boolean;

  constructor(data: Partial<RegisterDto>) {
    Object.assign(this, data);
  }
}
