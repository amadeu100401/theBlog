'use server';
import { PostCreateSchema } from '@/lib/post/validations';
import { ActionResult } from '@/types/action-result';
import { logColor } from '@/util/log-color';

export async function createPostAction(
  prevState: ActionResult<void>,
  formData: FormData,
): Promise<ActionResult<void>> {
  //TODO: verificar se o usuario está logado
  const raw = Object.fromEntries(formData.entries());
  logColor(JSON.stringify(raw));
  const parsed = await PostCreateSchema.safeParseAsync(raw);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    message: 'Post criado com sucesso',
  };
}
