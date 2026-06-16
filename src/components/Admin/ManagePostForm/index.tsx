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
import { DefaultDiv } from './defaultDiv';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

type PostMeta = {
  id: string;
  slug: string;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const isEditMode = !!publicPost?.id;

  const initialForm = makePartialPublicPost(publicPost);

  const initialMeta: PostMeta | null = publicPost
    ? {
        id: publicPost.id,
        slug: publicPost.slug,
      }
    : null;

  const hideIdAndSlug = initialForm.id === null || initialForm.id === undefined;

  const [state, action, isPending] = useActionState(createPostAction, {
    success: true,
    errors: undefined,
  });

  const [form, setForm] = useState<PublicPost>(initialForm);
  const [meta] = useState<PostMeta | null>(initialMeta);
  const errors = state.errors ?? {};

  useEffect(() => {
    if (!state) return;
  }, [state]);

  const fieldErrors = {
    title: errors.title?.[0],
    author: errors.author?.[0],
    excerpt: errors.excerpt?.[0],
    coverImageUrl: errors.coverImageUrl?.[0],
  };

  function updateField<K extends keyof PublicPost>(
    key: K,
    value: React.SetStateAction<PublicPost[K]>,
  ) {
    setForm(prev => {
      const resolved =
        typeof value === 'function'
          ? (value as (prev: PublicPost[K]) => PublicPost[K])(prev[key])
          : value;

      return {
        ...prev,
        [key]: resolved,
      };
    });
  }

  return (
    <form action={action}>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='Id gerado automaticamente'
          type='text'
          readOnly
          value={meta?.id}
          hidden={hideIdAndSlug}
        />
        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerado automaticamente'
          type='text'
          readOnly
          value={meta?.slug}
          hidden={hideIdAndSlug}
        />
        <DefaultDiv fieldErrors={fieldErrors.title}>
          <InputText
            labelText='Titulo'
            name='title'
            placeholder='Digite o título do post'
            type='text'
            value={form.title}
            hasError={fieldErrors.title !== undefined}
            onChange={e => updateField('title', e.target.value)}
          />
        </DefaultDiv>
        <DefaultDiv fieldErrors={fieldErrors.author}>
          <InputText
            labelText='Autor'
            name='author'
            value={form.author}
            placeholder='Digite o nome do autor'
            hasError={fieldErrors.author !== undefined}
            onChange={e => updateField('author', e.target.value)}
          />
        </DefaultDiv>
        <DefaultDiv fieldErrors={fieldErrors.excerpt}>
          <InputText
            labelText='Excerto'
            name='excerpt'
            placeholder='Digite o resumo do post'
            type='text'
            value={form.excerpt}
            hasError={fieldErrors.excerpt !== undefined}
            onChange={e => updateField('excerpt', e.target.value)}
          />
        </DefaultDiv>
        <MarkdownEditor
          labelText='Conteúdo'
          value={form.content}
          setValue={value => updateField('content', value)}
          textAreaName='content'
          disabled={false}
        />
        <ImageUploader />
        <DefaultDiv fieldErrors={fieldErrors.coverImageUrl}>
          <InputText
            labelText='URL da imagem de capa'
            name='coverImageUrl'
            placeholder='Digite a URL da imagem'
            type='text'
            value={form.coverImageUrl}
            hasError={fieldErrors.coverImageUrl !== undefined}
            onChange={e => updateField('coverImageUrl', e.target.value)}
          />
        </DefaultDiv>
        <InputCheckbox
          name='published'
          labelText='deixar público?'
          type='checkbox'
          defaultChecked={form.published}
        />
        <div className='mt-4 flex flex-row justify-center'>
          <ButtonComponent
            buttonType='default'
            size='lg'
            icon={<StickyNotePlus />}
            disabled={isPending}
          >
            {isPending
              ? 'Salvando...'
              : isEditMode
                ? 'Atualizar post'
                : 'Criar post'}
          </ButtonComponent>
        </div>
      </div>
    </form>
  );
}
