import { Email } from '@/domain/value-objects/Email';

export type LoginRequest = {
  email: Email;
  password: string;
};

export function LoginRequestBuilder(
  email: string,
  password: string,
): LoginRequest {
  return {
    email: new Email(email),
    password: password,
  };
}
