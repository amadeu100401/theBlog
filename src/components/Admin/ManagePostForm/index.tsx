'use client';

import { ButtonComponent } from '@/components/DefaultButton';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useState } from 'react';
import { ImageUploader } from '../imageManager';

type ManagePostFormProps = {
  id?: string;
};

export function ManagePostForm({ id }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState('');

  return (
    <form action={''} className='mb-16' id={id}>
      <div className='flex flex-col gap-6'>
        <InputText labelText='Name' placeholder='Seu nome aqui' />
        <InputText
          labelText='Sobrenome'
          placeholder='Seu sobrenome aqui'
          readOnly
          defaultValue={'Teste'}
        />

        <ImageUploader />

        <InputCheckbox labelText='Teste' />

        <MarkdownEditor
          disabled={false}
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
          labelText='Conteúdo'
        />

        <div className='mt-4'>
          <ButtonComponent buttonType='default' size='md'>
            Enviar
          </ButtonComponent>
        </div>
      </div>
    </form>
  );
}
