import { Auth } from '@/shared/constants/system_const';
import { hash } from 'bcrypt-ts';
import { cookies } from 'next/headers';

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function createSession(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(Auth.AUTH_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, //7 dias
  });
}
