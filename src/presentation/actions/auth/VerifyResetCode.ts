'use server';

import { ErrorValidateCodeType } from '@/application/UseCase/auth/ValidateResetPasswordCode/response';
import { container } from '@/infrastructure/di';
import { logColor } from '@/shared/util/log-color';
import { redirect } from 'next/navigation';

interface VerifyResetCodeInput {
  email: string;
  code: string;
}

interface VerifyResetCodeActionResponse {
  success: boolean;
  message: string;
}

export async function VerifyResetCodeAction({
  email,
  code,
}: VerifyResetCodeInput): Promise<VerifyResetCodeActionResponse> {
  if (!code || code.length !== 4 || !email) {
    return { success: false, message: 'Dados inválidos para a verificação' };
  }

  let redirectToken: string | undefined;

  try {
    const useCase = container.verifyResentPasswordCodeUSeCase;

    const result = await useCase.execute({
      email: email,
      code: code,
    });

    if (!result.success) {
      logColor(result.error);
      const response = {
        success: false,
        message: '',
      };

      if (result.error === ErrorValidateCodeType.USER_NOT_FOUNDED) {
        response.message = ErrorValidateCodeType.USER_NOT_FOUNDED;
      } else if (result.error === ErrorValidateCodeType.CODE_EXPIRED) {
        response.message = ErrorValidateCodeType.CODE_EXPIRED;
      } else {
        response.message = ErrorValidateCodeType.CODE_INVALID;
      }

      return response;
    }

    redirectToken = result.token;
  } catch (error) {
    if ((error as Error).message === 'NEXT_REDIRECT') throw error;

    logColor(
      'Erro na Server Action de validação do OTP:',
      JSON.stringify(error),
    );
    return {
      success: false,
      message:
        'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
    };
  }

  if (redirectToken) {
    redirect(`/reset-password?token=${redirectToken}`);
  }

  return {
    success: false,
    message: 'Não foi possível redirecionar. Tente novamente.',
  };
}
