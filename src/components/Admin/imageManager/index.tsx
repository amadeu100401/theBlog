'use client';

import { ButtonComponent } from '@/components/DefaultButton';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useTransition } from 'react';
import { toast } from 'sonner';
import { validateImageFile } from '@/util/validate-image';
import { uploadImageAction } from '@/actions/upload/upload-image-action';

const imgMaxSize = process.env.IMG_MAX_SIZE as unknown as number;

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
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) return;

    if (file.size > imgMaxSize) {
      const readableMaxSize = imgMaxSize / 1024;
      toast.error(`Imagem muito grande. MÁx: ${readableMaxSize}Kb.`);
      cleanFileInputValue();
      return;
    }

    const isValid = await validateImageFile(file);

    if (!isValid) {
      toast.error('Imagem inválida!');
      return;
    }

    const formData = buildFormData(file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        cleanFileInputValue();
        return;
      }

      //TODO: Continuar depois
      toast.info(result.url);
    });

    //TODO: Criar a action para envio da imagem
    cleanFileInputValue();
  }

  function buildFormData(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
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
