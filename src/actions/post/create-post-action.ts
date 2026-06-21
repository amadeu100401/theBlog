'use server';

import {
  makePartialPublicPost,
  PublicPost,
} from '@/application/DTOs/post/dtos';
import { revalidateCache } from '@/lib/cache/utils/cache-revalidates';
import { PostCreateSchema } from '@/lib/validates/post-validations';
import { PostModel } from '@/domain/entities/posts/post-model';
import { getZodErrorMessages } from '@/util/get-zod-error-messages';
import { makeSlugFromText } from '@/util/make-slug-from-text';
import { redirect } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import { postRepository } from '@/infrastructure/dependencyInjection/container';

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

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
      success: false,
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuid(),
    slug: makeSlugFromText(validPostData.title),
  };

  try {
    await postRepository.insertPost(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
        success: false,
      };
    }

    return {
      formState: newPost,
      errors: ['Erro desconhecido, tente novamente mais tarde'],
      success: false,
    };
  }

  revalidateCache(newPost.slug, 'all');

  redirect(`${newPost.id}?created=1`);
}
