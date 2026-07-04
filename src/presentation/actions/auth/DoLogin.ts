'use server';

import { LoginRequestBuilder } from '@/application/UseCase/auth/login/request';
import { container } from '@/infrastructure/di/container';
import { DoLoginSchema } from '@/shared/validators/login-valodations';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
  user?: { name: string; email: string };
} | null;

export async function doLoginAction(prevState: unknown, formData: FormData) {
  let loginSucesso = false;

  try {
    const rawData = Object.fromEntries(formData.entries());
    const parsed = DoLoginSchema.safeParse(rawData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const parsedBody = parsed.data;

    const loginUseCase = container.doLoginUseCase;

    const result = await loginUseCase.execute(
      LoginRequestBuilder(parsedBody.email, parsedBody.password),
    );

    const response = NextResponse.json({ user: result.user });

    response.cookies.set('auth_token', result.toke, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, //7 dias
      path: '/',
    });

    loginSucesso = true;
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || 'Erro de autenticação.',
      };
    }
  }

  if (loginSucesso) {
    redirect('/');
  }
}
