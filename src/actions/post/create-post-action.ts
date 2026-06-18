'use server';
import { makePartialPublicPost, PublicPost } from '@/DTOs/post/dtos';
import { revalidateCache } from '@/lib/cache/utils/cache-revalidates';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/posts/post-model';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/util/get-zod-error-messages';
import { makeSlugFromText } from '@/util/make-slug-from-text';
import { redirect } from 'next/navigation';
import { v4 as uuid } from 'uuid';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: verificar se o usuário tá logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
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

  const result = await postRepository.insertPost(newPost);

  if (!result) {
    return {
      formState: newPost,
      errors: [
        'Ocorreu um erro ao persistir na base de dados. Por favor, tente novamente mais tarde.',
      ],
    };
  }

  revalidateCache(newPost.slug, 'all');

  redirect(`${newPost.id}`);
}
