'use server';

//diretiva para criar uma server action -> isso acaba virando um endpoint da minha aplicação

type UploadImageActionResult = {
  url: string;
  error: string;
};

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

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Arquivo inválidos' });
  }

  if (file.size > maxImgSize) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  // TODO: Enviei o arquivo
  return makeResult({ url: 'URL-TEST' });
}
