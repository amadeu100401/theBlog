'use server';

import { makePublicUser, PublicUser } from '@/application/DTOs/user/dtos';
import { createSession } from '@/infrastructure/auth/session';
import { UserCreateSchema } from '@/shared/validators/user-validations';
import { getZodErrorMessages } from '@/shared/util/get-zod-error-messages';
import { redirect } from 'next/navigation';
import { container } from '@/infrastructure/di/container';
import { logColor } from '@/shared/util/log-color';

type CreateUserActionState = {
  formState: PublicUser;
  errors: string[];
  success?: boolean;
};

export async function CreateUserAction(
  prevState: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  const rawData = Object.fromEntries(formData.entries());
  logColor(JSON.stringify(rawData));
  const parsed = UserCreateSchema.safeParse(rawData);

  if (!parsed.success) {
    logColor(
      'AQUI 1',
      JSON.stringify(getZodErrorMessages(parsed.error.format())),
    );
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error.format()),
      formState: makePublicUser(rawData),
    };
  }

  let isSuccess = false;
  let userIdToLog = '';

  try {
    const result = await container.registerUserUseCase.execute(parsed.data);

    if (!result.success) {
      return {
        success: false,
        formState: prevState.formState,
        errors: ['Erro ao criar usuario'],
      };
    }

    isSuccess = result.success;
    userIdToLog = result.token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        formState: prevState.formState,
        errors: [error.message],
      };
    }

    return {
      success: false,
      formState: prevState.formState,
      errors: ['Erro interno no servidor ao processar o cadastro.'],
    };
  }

  if (isSuccess && userIdToLog) {
    await createSession(userIdToLog);
    redirect('/');
  }

  return {
    success: false,
    formState: prevState.formState,
    errors: ['Erro inesperado.'],
  };
}
