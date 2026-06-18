'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

// -> Não é utilizada para fazer um copnente do lado do servidor  || só é usado para criar server action
// são funções garantidas que rodarão apenas no servidor, podendo substituir uma API

export async function revalidadeExemploAction(formData: FormData) {
  const path = (formData.get('path') as string) || '';

  console.log(`Estou em uma server action ${path}`);

  //revalidatePath(path);

  revalidateTag('PageContet', 'max');
}
