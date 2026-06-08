'use server';

import { SupabaseStorageAdapter } from '@/adapters/Supabase/supabase-storage.adapter';
import { IImageStorage } from '@/interfaces/image-storage.interface';
import { validateAndGetOptimizedBuffer } from '@/util/validate-image';

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

  const { isValid, extension, optimizedBuffer } =
    await validateAndGetOptimizedBuffer(file);

  if (!isValid || !extension || !optimizedBuffer) {
    return makeResult({ error: 'Arquivo inválido.' });
  }

  const uploadResult = await imageStorage.upload(
    file,
    optimizedBuffer,
    extension,
  );

  if (uploadResult.success) {
    return makeResult({ url: uploadResult.path });
  }

  return makeResult({ error: uploadResult.error });
}
