import { UploadResult } from '@/types/upload-result';

export interface IImageStorage {
  upload(file: File, buffer: Buffer, extension: string): Promise<UploadResult>;
  delete(fileUrl: string): Promise<void>;
}
