'use server';

import { storageProvider } from '@/infrastructure/images/image-storage-factory';
import { validateAndGetOptimizedBuffer } from '@/util/validate-image';

//diretiva para criar uma server action -> isso acaba virando um endpoint da minha aplicação

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  // 'use server' -> podpe ser criada a nivel de arquivo

  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  const { isValid, extension, optimizedBuffer } =
    await validateAndGetOptimizedBuffer(file);

  if (!isValid || !extension || !optimizedBuffer) {
    return { url: '', error: 'Arquivo inválido' };
  }

  const result = await storageProvider.uploadFile(
    file,
    optimizedBuffer,
    extension,
  );

  return result.success
    ? { url: result.publicUrl, error: '' }
    : { url: '', error: result.error };
}
