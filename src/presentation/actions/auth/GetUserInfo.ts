import { ErrorType } from '@/application/UseCase/auth/GetSession/response';
import { container } from '@/infrastructure/di/container';
import { logColor } from '@/shared/util/log-color';

export type ActionState = {
  success: boolean;
  message?: string;
  tokenExpired: boolean;
  user?: { name: string; email: string; avatarUrl: string | undefined | null };
} | null;

export async function GetUserInfoResetPasswordAction(
  token: string,
): Promise<ActionState> {
  try {
    const useCase = container.getUserByTokenUseCase;

    const result = await useCase.execute(token);

    if (!result) {
      return {
        success: false,
        message: 'Erro ao obter dados da sessão',
        tokenExpired: false,
      };
    }

    if (result.status === false) {
      if (
        result.error === ErrorType.ERROR_GET_SESSION ||
        result.error === ErrorType.ERROR_GET_USER
      ) {
        return {
          success: false,
          message: 'Erro ao obter dados da sessão',
          tokenExpired: false,
        };
      }

      if (result.error === ErrorType.TOKEN_EXPIRED) {
        return {
          success: false,
          message: 'O token expirou',
          tokenExpired: true,
        };
      }

      return {
        success: false,
        message: 'Erro ao obter dados da sessão',
        tokenExpired: false,
      };
    } else {
      const user = result.session;
      return {
        success: true,
        user: user,
        tokenExpired: false,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      logColor('Erro ao obter user para reset de senha: ', error.message);
    }

    return {
      success: false,
      message: 'Error ao fazer obter dados da sessão.',
      tokenExpired: false,
    };
  }
}
