export type UploadResult =
  | {
      success: true;
      path: string;
      publicUrl: string;
    }
  | {
      success: false;
      error: string;
    };
