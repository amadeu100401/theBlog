import { UploadResult } from '@/types/upload-result';

export interface ImageStorageStrategy {
  upload(file: File, buffer: Buffer, extension: string): Promise<UploadResult>;
}
