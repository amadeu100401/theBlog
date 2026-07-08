'use server';

import { container } from '@/infrastructure/di/container';
import { Auth } from '@/shared/constants/system_const';
import { cookies } from 'next/headers';

export type ActionState = {
  success: boolean;
  message?: string;
  user?: { name: string; email: string; avatarUrl: string | undefined | null };
} | null;

export async function GetSessionAction(
  prevState: unknown,
  formData: null,
): Promise<ActionState> {
  try {
    const token = (await cookies()).get(Auth.AUTH_TOKEN)?.value as string;

    const useCase = container.getSessionUseCase;

    const result = await useCase.execute(token);

    if (!result || !result.status || !result.session) {
      return {
        success: false,
        message: 'Nenhum usuário logado',
      };
    }

    const user = result.session;

    return {
      success: true,
      user: {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    };
  } catch {
    return {
      success: false,
      message: 'Erro ao obter sessão do usuário',
    };
  }
}
