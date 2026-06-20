'use server';

import { PublicUser } from '@/DTOs/user/dtos';
import { UserModel } from '@/models/user/user-model';
import { logColor } from '@/util/log-color';
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
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formDataObj = Object.fromEntries(formData.entries());
  logColor('Chegou até a action', JSON.stringify(formDataObj));
  redirect('/');
}
