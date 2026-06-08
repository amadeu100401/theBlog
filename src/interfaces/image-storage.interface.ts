import { UploadResult } from '@/types/upload-result';

export interface IImageStorage {
  upload(file: File, extension: string): Promise<UploadResult>;
  delete(fileUrl: string): Promise<void>;
}
