'use server';

import {
  CreatePostDTO,
  makePartialPublicPost,
  PublicPost,
} from '@/application/DTOs/post/dtos';
import { revalidateCache } from '@/cache/utils/cache-revalidates';
import { PostCreateSchema } from '@/validates/post-validations';
import { getZodErrorMessages } from '@/util/get-zod-error-messages';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { logColor } from '@/util/log-color';
import { createPostUseCase } from '@/infrastructure/dependencyInjection/post.container';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: boolean;
};

export async function CreatePostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: verificar se o usuário tá logado
  const cookieToken = await cookies();
  const token = cookieToken.get('session_token')?.value;

  if (!token) {
    const message = 'Usuário não autenticado';
    return throwError(prevState.formState, message);
  }

  const rawFormObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(rawFormObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(rawFormObj),
      success: false,
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: CreatePostDTO = {
    token: token,
    ...validPostData,
  };

  let isSuccess = false;
  let post;

  try {
    const result = await createPostUseCase.execute(newPost);
    if (result.success) {
      isSuccess = true;
      post = result.post;
    }
  } catch (e: unknown) {
    logColor('Erro na criação do post: ', JSON.stringify(e));

    if (e instanceof Error) {
      return throwError(prevState.formState, e.message);
    }

    return throwError(prevState.formState);
  }

  if (isSuccess && post) {
    revalidateCache(post.slug, 'all');
    redirect(`${post.id}?created=1`);
  }

  return throwError(prevState.formState, 'Erro ao salvar post');
}

function throwError(post: PublicPost, message?: string) {
  return {
    formState: post,
    errors: [
      message ? message : 'Erro desconhecido, tente novamente mais tarde',
    ],
    success: false,
  };
}
