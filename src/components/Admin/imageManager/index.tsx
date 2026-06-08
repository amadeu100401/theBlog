'use client';

import { ButtonComponent } from '@/components/DefaultButton';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useTransition } from 'react';
import { toast } from 'sonner';
import { uploadImageAction } from '@/actions/upload/upload-image-action';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition(); //vai ajudar a controlar a action

  function handleChooseFile() {
    // .current garante o valor atual
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }
  async function handleChange() {
    toast.dismiss();

    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    if (!validateClientSide(file)) {
      toast.error('Arquivo inválido ou muito grande');
      cleanFileInputValue();
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        cleanFileInputValue();
        return;
      }

      toast.success('Upload concluído!');
    });

    cleanFileInputValue();
  }

  function validateClientSide(file: File) {
    const MAX_SIZE = Number(
      process.env.NEXT_PUBLIC_IMG_MAX_SIZE ?? 5 * 1024 * 1024,
    );

    const isImage = file.type.startsWith('image/');
    const isAllowedSize = file.size <= MAX_SIZE;

    return isImage && isAllowedSize;
  }

  function cleanFileInputValue() {
    const fileInput = fileInputRef.current;

    if (!fileInput) return;

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <ButtonComponent
        buttonType={'default'}
        type='button'
        className='self-start'
        icon={<ImageUpIcon />}
        onClick={handleChooseFile}
      >
        Enviar uma imagem
      </ButtonComponent>
      <input
        ref={fileInputRef}
        type='file'
        name='file'
        className='hidden'
        accept='image/*'
        onChange={handleChange}
      />
    </div>
  );
}
