'use client';

import { ButtonComponent } from '@/components/DefaultButton';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useActionState, useEffect, useState } from 'react';
import { ImageUploader } from '../imageManager';
import { makePartialPublicPost, PublicPost } from '@/DTOs/post/dtos';
import { StickyNotePlus } from 'lucide-react';
import { createPostAction } from '@/actions/post/create-post-action';
import { toast } from 'sonner';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || '');
  const hideIdAndSlug = !formState.id || !formState.slug;

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='Id gerado automaticamente'
          type='text'
          readOnly
          defaultValue={formState?.id}
          hidden={hideIdAndSlug}
        />
        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerado automaticamente'
          type='text'
          readOnly
          defaultValue={formState?.slug}
          hidden={hideIdAndSlug}
        />
        <InputText
          labelText='Titulo'
          name='title'
          placeholder='Digite o título do post'
          type='text'
          defaultValue={formState.title}
        />
        <InputText
          labelText='Autor'
          name='author'
          defaultValue={formState.author}
          placeholder='Digite o nome do autor'
        />
        <InputText
          labelText='Excerto'
          name='excerpt'
          placeholder='Digite o resumo do post'
          type='text'
          defaultValue={formState.excerpt}
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
          name='coverImageUrl'
          placeholder='Digite a URL da imagem'
          type='text'
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          name='published'
          labelText='deixar público?'
          type='checkbox'
          defaultChecked={formState.published}
        />
        <div className='mt-4 flex flex-row justify-center'>
          <ButtonComponent
            buttonType='default'
            size='lg'
            icon={<StickyNotePlus />}
            disabled={isPending}
          >
            Enviar
          </ButtonComponent>
        </div>
      </div>
    </form>
  );
}
