import fileTypeChecker from 'file-type-checker';
import sharp from 'sharp';

type Result = {
  isValid: boolean;
  extension: string | null;
  optimizedBuffer?: Buffer;
};

export async function validateAndGetOptimizedBuffer(
  file: File,
): Promise<Result> {
  if (!(file instanceof File)) {
    return { isValid: false, extension: null };
  }

  if (!file.type?.startsWith('image/')) {
    return { isValid: false, extension: null };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const bytes = new Uint8Array(buffer);

  const isSignatureValid = fileTypeChecker.validateFileType(bytes, [
    'png',
    'jpeg',
    'gif',
    'webp',
  ]);

  if (!isSignatureValid) {
    return { isValid: false, extension: null };
  }

  try {
    const image = sharp(buffer, { failOn: 'error' });

    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      return { isValid: false, extension: null };
    }

    const MAX_PIXELS = 25_000_000;

    if (metadata.width * metadata.height > MAX_PIXELS) {
      return { isValid: false, extension: null };
    }

    const optimizedBuffer = await image
      .rotate()
      .resize({ width: 2000, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    return {
      isValid: true,
      extension: 'webp',
      optimizedBuffer,
    };
  } catch {
    return { isValid: false, extension: null };
  }
}
