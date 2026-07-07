'use server';

import { LoginRequestBuilder } from '@/application/UseCase/auth/DoLogin/request';
import { container } from '@/infrastructure/di/container';
import { Auth } from '@/shared/constants/system_const';
import { DoLoginSchema } from '@/shared/validators/login-valodations';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
  user?: { name: string; email: string };
} | null;

export async function DoLoginAction(prevState: unknown, formData: FormData) {
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

    const cookieStore = await cookies();
    cookieStore.set(Auth.AUTH_TOKEN, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, //7 dias
      path: '/',
    });

    revalidatePath('/', 'layout');
    redirect('/');
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || 'Erro de autenticação.',
      };
    }
  }
}
