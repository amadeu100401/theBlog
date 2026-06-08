'use server';

import { SupabaseStorageAdapter } from '@/adapters/Supabase/supabase-storage.adapter';
import { IImageStorage } from '@/interfaces/image-storage.interface';
import { validateImageFile } from '@/util/validate-image';

//diretiva para criar uma server action -> isso acaba virando um endpoint da minha aplicação

type UploadImageActionResult = {
  url: string;
  error: string;
};

const imageStorage: IImageStorage = new SupabaseStorageAdapter();

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  // 'use server' -> podpe ser criada a nivel de arquivo

  const maxImgSize = parseInt(process.env.IMG_MAX_SIZE as string);
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!file) {
    return makeResult({ error: 'Arquivo inválidos' });
  }

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválidos' });
  }

  if (file.size > maxImgSize) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';

  const uploadResult = await imageStorage.upload(file, extension);

  if (uploadResult.success) {
    return makeResult({ url: uploadResult.path });
  }

  return makeResult({ error: uploadResult.error });
}
