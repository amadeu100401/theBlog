'use client';

import { ButtonComponent } from '@/components/DefaultButton';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { uploadImageAction } from '@/actions/images/upload-image-action';
import Image from 'next/image';
import { clsx } from 'clsx';
import { IsdevelopmentEnvironment } from '@/util/http-context';
import { logColor } from '@/util/log-color';

type ImageUploaderProps = {
  disable?: boolean;
};

export function ImageUploader({ disable = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition(); //vai ajudar a controlar a action
  const [imgUrl, setImgUrl] = useState('');

  function handleChooseFile() {
    // .current garante o valor atual
    if (!fileInputRef.current) {
      cleanFileInputValue();
      return;
    }

    fileInputRef.current.click();
  }

  async function handleChange() {
    toast.dismiss();

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      cleanFileInputValue();
      return;
    }

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

      const imageUrl = result.url;

      setImgUrl(imageUrl);
      toast.success('Imagem enviada!');
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

    if (!fileInput) {
      cleanFileInputValue();
      return;
    }

    setImgUrl('');

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <ButtonComponent
        styleType={'default'}
        type='button'
        className='self-start'
        leftIcon={<ImageUpIcon />}
        onClick={handleChooseFile}
        disabled={isUploading || disable}
      >
        Enviar uma imagem
      </ButtonComponent>

      {!!imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>
            <b>URL:</b> {imgUrl}
          </p>

          <div
            className={clsx(
              'relative w-full max-w-xl',
              'aspect-video overflow-hidden',
              'rounded-lg border',
            )}
          >
            <Image src={imgUrl} alt='preview' fill className='object-contain' />
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type='file'
        name='file'
        className='hidden'
        accept='image/*'
        onChange={handleChange}
        disabled={isUploading || disable}
      />
    </div>
  );
}
