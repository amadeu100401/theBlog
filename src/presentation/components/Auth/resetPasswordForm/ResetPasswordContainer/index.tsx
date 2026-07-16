import { ResetPassword } from '@/presentation/components/Auth/resetPasswordForm';
import { KeyRoundIcon } from 'lucide-react';
import { ResetPasswordTimer } from '../ResetPasswordClock';
import { maskedEmail } from '@/shared/util/mask-email';
interface ContainerProps {
  params: Promise<{ token: string }>;
}

export async function ResetPasswordContainer({ params }: ContainerProps) {
  const { token } = await params;

  const email = 'amadeumartiM@gmail.com';
  const outOfTime = false;

  return (
    <main className='flex flex-col min-h-screen pt-10'>
      <header>
        <div className='mb-4 grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white shadow-sm'>
          <KeyRoundIcon className='h-5 w-5' />
        </div>
        <h1 className='text-3xl font-semibold tracking-tight text-slate-900'>
          Criar nova senha
        </h1>
        <ResetPasswordTimer />
        <p className='mt-2 text-sm text-slate-500'>
          {email ? (
            <>
              Redefinindo o acesso de{' '}
              <span className='font-medium text-slate-900'>
                {maskedEmail(email)}
              </span>
              .{' '}
            </>
          ) : null}
          Escolha uma senha forte que você ainda não tenha usado.
        </p>
      </header>
      <ResetPassword token={token} outOfTime={outOfTime} />
    </main>
  );
}
