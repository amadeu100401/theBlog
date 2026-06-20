import { RegisterUserForm } from '@/components/Auth/registeForm';
import clsx from 'clsx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar usuário',
};

export default async function Register() {
  return (
    <div
      className={clsx('flex flex-col justify-center items-center gap-6 p-2')}
    >
      <h1 className='text-xl font-bold'>Criar sua conta</h1>
      <RegisterUserForm />
    </div>
  );
}
