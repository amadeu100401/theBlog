import { ImageStorageStrategy } from '@/interfaces/image-storage.interface';
import { supabasePublicClient } from '@/infrastructure/db/database/external/Supabase/client';
import { UploadResult } from '@/shared/types/upload-result';
import { SupabaseClient } from '@supabase/supabase-js';

export class SupabaseStorageStrategy implements ImageStorageStrategy {
  private cliente: SupabaseClient;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.BUCKET_NAME || 'images';
    this.cliente = supabasePublicClient;
  }

  async upload(
    file: File,
    buffer: Buffer,
    extension: string,
  ): Promise<UploadResult> {
    try {
      const fileName = `${Date.now()}-${file.name}.${extension}`;

      const { data, error } = await this.cliente.storage
        .from(this.bucketName)
        .upload(fileName, buffer, {
          contentType: '',
          upsert: false,
        });

      if (error) throw error;

      const { data: urlData } = this.cliente.storage
        .from(this.bucketName)
        .getPublicUrl(data.path);

      return {
        success: true,
        path: data.path,
        publicUrl: urlData.publicUrl,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: false,
        error: 'Erro ao salvar imagem no supabase',
      };
    }
  }
}
