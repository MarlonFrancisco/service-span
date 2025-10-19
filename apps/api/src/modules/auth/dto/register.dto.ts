export class RegisterDto {
  email: string;
  telephone: string;
  firstName: string;
  lastName: string;
  acceptedTerms: boolean;
  paymentCustomerId: string;

  constructor(data: Partial<RegisterDto>) {
    Object.assign(this, data);
  }
}
