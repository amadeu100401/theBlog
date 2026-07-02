import { ImageStorageStrategy } from '@/domain/contracts/image-storage.interface';
import { SupabaseStorageStrategy } from './supabase-storage.strategy';
import { LocalStorageStrategy } from './local-storage.strategy';

export class ImageStorageContext {
  private strategy: ImageStorageStrategy;

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.strategy = new SupabaseStorageStrategy();
    } else {
      this.strategy = new LocalStorageStrategy();
    }
  }

  async uploadFile(file: File, buffer: Buffer, extension: string) {
    return this.strategy.upload(file, buffer, extension);
  }
}

export const storageProvider = new ImageStorageContext();
