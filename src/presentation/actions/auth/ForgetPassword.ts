'use server';

import { ForgetPasswordRequestBuilder } from '@/application/UseCase/auth/ForgetPassword/request';
import { container } from '@/infrastructure/di/container';
import { logColor } from '@/shared/util/log-color';
import { ForgetPasswordSchema } from '@/shared/validators/forgetPassword-validatons';

export type ActionState = {
  success: boolean;
  email?: string;
  errors?: {
    email?: string[] | undefined;
  };
  message?: string;
} | null;

export async function ForgetPasswordAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const parsed = ForgetPasswordSchema.safeParse(rawData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const parsedBody = parsed.data;

    const useCase = container.sendForgetPasswordEmailUseCase;

    await useCase.execute(ForgetPasswordRequestBuilder(parsedBody.email));

    return {
      success: true,
      email: parsed.data.email,
      message:
        'Se o e-mail estiver cadastrado, você receberá um link de recuperação em instantes.',
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      logColor('Erro: ', error.message);
      return {
        success: false,
        message: 'Ocorreu um erro no servidor. Tente novamente.',
      };
    }

    logColor('Erro desconhecido');
    return {
      success: false,
      message: 'Ocorreu um erro no servidor. Tente novamente.',
    };
  }
}
