'use server';

import { makePublicUser, PublicUser } from '@/application/DTOs/user/dtos';
import { createSession } from '@/infrastructure/auth/session';
import { UserCreateSchema } from '@/shared/validators/user-validations';
import { getZodErrorMessages } from '@/shared/util/get-zod-error-messages';
import { redirect } from 'next/navigation';
import { container } from '@/infrastructure/di/container';

type CreateUserActionState = {
  formState: PublicUser;
  errors: string[];
  success?: boolean;
};

export async function CreateUserAction(
  prevState: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  const parsed = UserCreateSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error.format()),
      formState: makePublicUser(Object.fromEntries(formData.entries())),
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
    userIdToLog = result.userId;
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
