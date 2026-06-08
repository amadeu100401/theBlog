import fileTypeChecker from 'file-type-checker';
import sharp from 'sharp';

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

  const canDecode = await isValidToDecode(buffer);

  const isValidImage =
    isFileType && isVlaidImageInputType && isSignatureValid && canDecode;

  const extension = await sharp(buffer)
    .metadata()
    .then(m => m.format)
    .catch(() => null);

  return { isValid: isValidImage, extension: extension };
}

async function isValidToDecode(buffer: ArrayBuffer): Promise<boolean> {
  try {
    await sharp(Buffer.from(buffer)).metadata();
    return true;
  } catch {
    return false;
  }
}
