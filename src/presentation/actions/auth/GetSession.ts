'use server';

import { container } from '@/infrastructure/di/container';
import { Auth } from '@/shared/constants/system_const';
import { cookies } from 'next/headers';

export async function GetSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(Auth.AUTH_TOKEN)?.value;

    if (!token) return null;

    const useCase = container.getSessionUseCase;
    const sessionInfo = await useCase.execute(token);

    if (sessionInfo.status === false) {
      return null;
    }

    const session = sessionInfo.session;

    return {
      name: session.name,
      email: session.email,
      avatarUrl: session.avatarUrl,
    };
  } catch {
    return null;
  }
}
