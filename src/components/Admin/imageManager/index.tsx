'use client';

import { ButtonComponent } from '@/components/DefaultButton';
import { ImageUpIcon } from 'lucide-react';
import { useRef } from 'react';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChooseFile() {
    // .current garante o valor atual
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) return;

    console.log(file);
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
