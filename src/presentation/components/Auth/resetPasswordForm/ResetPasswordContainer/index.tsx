import { KeyRoundIcon } from 'lucide-react';
import { ResetPasswordContent } from '../ResetPasswordContent';
import { GetUserInfoResetPasswordAction } from '@/presentation/actions/auth/GetUserInfo';
import { notFound } from 'next/navigation';
interface ContainerProps {
  searchParams: Promise<{ token?: string }>;
}

export async function ResetPasswordContainer({ searchParams }: ContainerProps) {
  const { token } = await searchParams;

  if (!token) notFound();

  const result = await GetUserInfoResetPasswordAction(token);

  let isFailed = false;
  let isTokenExpired = false;

  if (result === null || !result.success) {
    isFailed = true;
    notFound();
  }

  isTokenExpired = result.tokenExpired;

  const user = result?.user;

  const email = user?.email;

  return (
    <main className='flex flex-col min-h-screen pt-10'>
      <div className='mb-4 grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white shadow-sm'>
        <KeyRoundIcon className='h-5 w-5' />
      </div>
      <h1 className='text-3xl font-semibold tracking-tight text-slate-900'>
        Criar nova senha
      </h1>
      <ResetPasswordContent
        isFail={isFailed}
        isTokenExpired={isTokenExpired}
        email={email}
      />
    </main>
  );
}
