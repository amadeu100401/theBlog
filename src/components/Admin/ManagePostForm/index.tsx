'use client';

import { ButtonComponent } from '@/components/DefaultButton';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useState } from 'react';
import { ImageUploader } from '../imageManager';
import { PublicPost } from '@/DTOs/post/dtos';
import { StickyNotePlus } from 'lucide-react';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  console.log(publicPost?.content);
  const [contentValue, setContentValue] = useState(publicPost?.content || '');
  const hideIdAndSlug = publicPost !== null || publicPost !== undefined;

  return (
    <form action={''} className='mb-16' id={publicPost?.id}>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='Id gerado automaticamente'
          type='text'
          readOnly
          defaultValue={publicPost?.id || ''}
          hidden={hideIdAndSlug}
        />
        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerado automaticamente'
          type='text'
          readOnly
          defaultValue={publicPost?.slug || ''}
          hidden={hideIdAndSlug}
        />
        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
          defaultValue={publicPost?.author || ''}
        />
        <InputText
          labelText='Titulo'
          name='title'
          placeholder='Digite o título do post'
          type='text'
          defaultValue={publicPost?.title || ''}
        />
        <InputText
          labelText='Excerto'
          name='excerpt'
          placeholder='Digite o resumo do post'
          type='text'
          defaultValue={publicPost?.excerpt || ''}
        />
        <MarkdownEditor
          labelText='Conteúdo'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={false}
        />

        <ImageUploader />

        <InputText
          labelText='URL da imagem de capa'
          name='coverImgURL'
          placeholder='Digite a URL da imagem'
          type='text'
          defaultValue={publicPost?.coverImageUrl || ''}
        />

        <InputCheckbox
          name='published'
          labelText='deixar público?'
          type='checkbox'
          defaultChecked={publicPost?.published || false}
        />

        <div className='mt-4 flex flex-row justify-center'>
          <ButtonComponent
            buttonType='default'
            size='lg'
            icon={<StickyNotePlus />}
          >
            Enviar post
          </ButtonComponent>
        </div>
      </div>
    </form>
  );
}
