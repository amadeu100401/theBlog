'use server';

import { makePublicUser, PublicUser } from '@/application/DTOs/user/dtos';
import { CreateUserUseCase } from '@/application/UseCase/user/create-user.use-case';
import { UserCreateSchema } from '@/lib/validates/user-validations';
import { getZodErrorMessages } from '@/util/get-zod-error-messages';
import { redirect } from 'next/navigation';

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

  const useCase = new CreateUserUseCase();

  const result = await useCase.execute(parsed.data);

  if (!result.success) {
    return {
      success: false,
      formState: prevState.formState,
      errors: ['Erro ao criar usuario'],
    };
  }

  redirect('/');
}
