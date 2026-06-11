'use server';

import { ImageStorageContext } from '@/infrastructure/db/storage/strategies/images/image-storage-factory';
import { simulateAwait } from '@/util/async-delay';
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

  await simulateAwait('uploadImageAction', true, 5000);

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

  const storage = new ImageStorageContext();

  const result = await storage.upload(file, optimizedBuffer, extension);

  return result.success
    ? { url: result.publicUrl, error: '' }
    : { url: '', error: result.error };
}
