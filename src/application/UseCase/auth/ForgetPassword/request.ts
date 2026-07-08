import { Email } from '@/domain/value-objects/Email';

export type ForgetPasswordRequest = {
  email: Email;
};

export function ForgetPasswordRequestBuilder(
  email: string,
): ForgetPasswordRequest {
  return {
    email: new Email(email),
  };
}
