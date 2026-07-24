'use server';

import { container } from '@/infrastructure/di';
import { logColor } from '@/shared/util/log-color';
import { resetPasswordRequest as ResetPasswordSchema } from '@/shared/validators/reset-password-validatons';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';

type Response = { status: true } | { status: false; message: string };

export async function ResetPasswordAction(
  prevState: unknown,
  formData: FormData,
): Promise<Response> {
  const rawData = Object.fromEntries(formData.entries());
  const parsed = await ResetPasswordSchema.safeParseAsync(rawData);

  if (!parsed.success) {
    logColor('Dados inválidos: ', JSON.stringify(parsed.error.format()));
    return { status: false, message: 'Invalid email or password' };
  }

  try {
    const parsedBody = parsed.data;

    const useCase = container.resetPasswordUseCase;

    const result = await useCase.execute({
      email: parsedBody.email,
      newPassword: parsedBody.password,
    });

    if (!result.status) {
      logColor(parsedBody.email, result.message);
      return {
        status: false,
        message: result.message,
      };
    }

    revalidatePath('/', 'layout');
    redirect('/login');
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    const message =
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as { message: unknown }).message === 'string'
        ? (error as { message: string }).message
        : 'Unknown error';

    return { status: false, message };
  }
}
