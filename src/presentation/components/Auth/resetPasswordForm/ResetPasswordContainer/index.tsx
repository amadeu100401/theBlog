import { KeyRoundIcon } from 'lucide-react';
import { ResetPasswordContent } from '../ResetPasswordContent';
interface ContainerProps {
  params: Promise<{ token: string }>;
}

export async function ResetPasswordContainer({ params }: ContainerProps) {
  const { token } = await params;

  const email = 'amadeumartim@gmail.com';

  const isTokenExpired = false;

  return (
    <main className='flex flex-col min-h-screen pt-10'>
      <div className='mb-4 grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white shadow-sm'>
        <KeyRoundIcon className='h-5 w-5' />
      </div>
      <h1 className='text-3xl font-semibold tracking-tight text-slate-900'>
        Criar nova senha
      </h1>
      <ResetPasswordContent isTokenExpired={isTokenExpired} email={email} />
    </main>
  );
}
