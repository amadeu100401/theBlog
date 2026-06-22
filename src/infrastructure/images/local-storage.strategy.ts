import { ImageStorageStrategy } from '@/interfaces/image-storage.interface';
import { UploadResult } from '@/types/upload-result';
import path from 'path';
import fs from 'fs/promises';
import { logColor } from '@/util/log-color';

export class LocalStorageStrategy implements ImageStorageStrategy {
  uploadDir = path.resolve(process.cwd(), 'public', 'uploads');

  constructor() {
    fs.mkdir(this.uploadDir, { recursive: true }).catch(() => {});
  }

  async upload(
    file: File,
    buffer: Buffer,
    extension: string,
  ): Promise<UploadResult> {
    try {
      const fileName = `${Date.now()}-${file.name}.${extension}`;
      const filePath = path.join(this.uploadDir, fileName);

      await fs.writeFile(filePath, buffer);

      return {
        success: true,
        path: `/uploads/${fileName}`,
        publicUrl: `/uploads/${fileName}`,
      };
    } catch (error) {
      logColor('Erro ao salvar imagem localmente', JSON.stringify(error));

      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: false,
        error: 'Erro ao salvar imagem localmente',
      };
    }
  }
}
