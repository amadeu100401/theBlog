import fileTypeChecker from 'file-type-checker';

type validateImageFileResult = {
  isValid: boolean;
  extension: string | null;
};

export async function validateImageFile(
  file: File,
): Promise<validateImageFileResult> {
  const isFileType = file instanceof File;
  const isVlaidImageInputType = file.type.startsWith('image/');

  const buffer = await file.arrayBuffer();

  const bytes = new Uint8Array(buffer);

  const isSignatureValid = fileTypeChecker.validateFileType(bytes, [
    'png',
    'jpeg',
    'gif',
  ]);

  const canDecode = await validateImage(file);

  const isValidImage =
    isFileType && isVlaidImageInputType && isSignatureValid && canDecode;

  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';

  console.log('A imagem é valida: ', isVlaidImageInputType);

  return { isValid: isValidImage, extension: extension };
}

function validateImage(file: File): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(true);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(false);
    };

    img.src = url;
  });
}
