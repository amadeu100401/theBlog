'use client';

import { deletePostAction } from '@/presentation/actions/post/delete-post.action';
import { ButtonComponent } from '@/presentation/components/DefaultButton';
import { Dialog } from '@/presentation/components/Dialog';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import clsx from 'clsx';

type DeleteButtonProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setShowDialog(true);
  }

  async function handleConfirm() {
    startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);

      if (result.error) {
        toast.error('Erro ao apagar post.', {
          description: result.error,
        });
      }

      toast.success('Post apagado com sucesso');
      router.refresh();
    });
  }

  return (
    <>
      <ButtonComponent
        className={clsx(
          'text-red-500 cursor-pointer',
          '[&_svg]:w-5 [&_svg]:h-5',
          'hover:scale-125 transition hover:text-red-700',
          'disabled:text-slate-600 disabled:cursor-default disabled:scale-100 disabled:transition',
        )}
        styleType='custom'
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={handleClick}
        disabled={isPending}
      >
        <Trash2Icon />
      </ButtonComponent>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title={'Apagar post?'}
          content={`Tem certeza que deseja apagar o post "${title}"?`}
          buttonLabel='Apagar'
          type='action'
          showXButton
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          isDisable={isPending}
        />
      )}
    </>
  );
}
