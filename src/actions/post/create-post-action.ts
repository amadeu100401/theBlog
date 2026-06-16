'use server';

import { PublicPost } from '@/DTOs/post/dtos';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success: boolean;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  //TODO: verificar se o usuario está logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  console.log(formDataToObject);

  return {
    formState: {
      ...prevState.formState,
    },
    errors: [],
    success: true,
  };
}
