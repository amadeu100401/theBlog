'use client';

import { ButtonComponent } from '@/components/DefaultButton';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useActionState, useEffect, useState } from 'react';
import { ImageUploader } from '../imageManager';
import { makePartialPublicPost, PublicPost } from '@/DTOs/post/dtos';
import { FilesIcon, StickyNotePlus } from 'lucide-react';
import { CreatePostAction } from '@/actions/post/create-post-action';
import { toast } from 'sonner';
import { UpdatePostAction } from '@/actions/post/update-post-action';
import clsx from 'clsx';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost: PublicPost;
  created: boolean;
};

type ManagePostFormCreateProps = {
  mode: 'create';
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;

  let publicPost;
  let created = false;

  if (mode === 'update') {
    publicPost = props.publicPost;
    created = props.created;
  }

  const serverAction = {
    update: UpdatePostAction,
    create: CreatePostAction,
  };

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    serverAction[mode],
    initialState,
  );

  useEffect(() => {
    if (mode === 'create' && created) {
      toast.dismiss();
      toast.success('Post criado com sucesso');
    }
  }, [created, mode]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post atualizado');
    }
  }, [state.success]);

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || '');
  const hideIdAndSlug = !formState.id || !formState.slug;

  const inputClasses = clsx('bg-white');

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
          disabled={isPending}
          className={inputClasses}
        />
        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerada automaticamente'
          type='text'
          readOnly
          defaultValue={formState?.slug}
          hidden={hideIdAndSlug}
          disabled={isPending}
          className={inputClasses}
        />
        <InputText
          labelText='Titulo'
          name='title'
          placeholder='Digite o título do post'
          type='text'
          defaultValue={formState.title}
          disabled={isPending}
          className={inputClasses}
        />
        <InputText
          labelText='Autor'
          name='author'
          defaultValue={formState.author}
          placeholder='Digite o nome do autor'
          disabled={isPending}
          className={inputClasses}
        />
        <InputText
          labelText='Excerto'
          name='excerpt'
          placeholder='Digite o resumo do post'
          type='text'
          defaultValue={formState.excerpt}
          disabled={isPending}
          className={inputClasses}
        />
        <MarkdownEditor
          labelText='Conteúdo'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={isPending}
        />
        <ImageUploader disable={isPending} />
        <InputText
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a URL da imagem'
          type='text'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
          className={inputClasses}
        />
        <InputCheckbox
          name='published'
          labelText='deixar público?'
          type='checkbox'
          defaultChecked={formState.published}
          disabled={isPending}
        />
        <div className='mt-4 flex flex-row justify-center'>
          <ButtonComponent
            styleType='default'
            size='lg'
            leftIcon={mode === 'update' ? <FilesIcon /> : <StickyNotePlus />}
            disabled={isPending}
          >
            {mode === 'update' ? 'Atualizar' : 'Enviar post'}
          </ButtonComponent>
        </div>
      </div>
    </form>
  );
}
