'use client';

import { ButtonComponent } from '@/components/DefaultButton';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useActionState, useState } from 'react';
import { ImageUploader } from '../imageManager';
import { makePartialPublicPost, PublicPost } from '@/DTOs/post/dtos';
import { StickyNotePlus } from 'lucide-react';
import { createPostAction } from '@/actions/post/create-post-action';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const hideIdAndSlug = publicPost !== null || publicPost !== undefined;

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
    success: true,
  };
  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState,
  );

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || '');

  // useEffect(() => {
  //   console.log(state.number);
  // }, [state.number]);

  return (
    <form action={action} className='mb-16' id={publicPost?.id}>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='Id gerado automaticamente'
          type='text'
          readOnly
          defaultValue={formState.id}
          hidden={hideIdAndSlug}
        />
        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerado automaticamente'
          type='text'
          readOnly
          defaultValue={formState.slug}
          hidden={hideIdAndSlug}
        />
        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
          defaultValue={formState.slug}
        />
        <InputText
          labelText='Titulo'
          name='title'
          placeholder='Digite o título do post'
          type='text'
          defaultValue={formState.title}
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
          name='coverImgURL'
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
          >
            Enviar post
          </ButtonComponent>
        </div>
      </div>
    </form>
  );
}
