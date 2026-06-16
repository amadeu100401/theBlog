import { ManagePostForm } from '@/components/Admin/managePostForm';
import clsx from 'clsx';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Criar post' };

export default function NewPostPage() {
  return (
    <div className={clsx('flex flex-col gap-6')}>
      <h1 className='text-xl font-extrabold'>Criar post</h1>
      <ManagePostForm />
    </div>
  );
}
