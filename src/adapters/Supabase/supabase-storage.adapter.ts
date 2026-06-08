import { IImageStorage } from '@/interfaces/image-storage.interface';
import { supabaseAdmin } from '@/lib/Supabase/supabase';
import { UploadResult } from '@/types/upload-result';
import { logColor } from '@/util/log-color';

export class SupabaseStorageAdapter implements IImageStorage {
  async upload(file: File): Promise<UploadResult> {
    const extension = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${extension}`;

    console.log({
      fileName,
      fileSize: file.size,
      fileType: file.type,
    });

    const { error } = await supabaseAdmin.storage
      .from('images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      logColor(JSON.stringify(error));
      return {
        success: false,
        error: `${error?.message ?? error}`,
      };
    }

    const bucketName = process.env.BUCKET_NAME!;

    const { data } = supabaseAdmin.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return {
      success: true,
      path: fileName,
      publicUrl: data.publicUrl,
    };
  }

  delete(fileUrl: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
