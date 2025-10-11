export class LoginFirstStepDto {
  email?: string;
  telephone?: string;

  constructor(data: Partial<LoginFirstStepDto>) {
    Object.assign(this, data);
  }
}
