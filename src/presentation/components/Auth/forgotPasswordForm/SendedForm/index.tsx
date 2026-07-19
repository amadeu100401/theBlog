import { ForgetPasswordAction } from '@/presentation/actions/auth/ForgetPassword';
import { ButtonComponent } from '@/presentation/components/DefaultButton';
import { Step } from '@/presentation/components/Step';
import clsx from 'clsx';
import { CircleCheckBigIcon, RefreshCcwIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MaxRetryButton } from './maxRetryButton/idndex';
import { maskedEmail } from '@/shared/util/mask-email';
import { logColor } from '@/shared/util/log-color';
import { CodeInputForm } from '../CodeForm';

type SendedEmailProps = {
  userEmail: string;
  onValueChange: () => void;
};

type Status = 'idle' | 'submitting' | 'sent';

const cooldownStartTime = 45;
const maxAttemptsCount = 5;

export function SendedEmail({ userEmail, onValueChange }: SendedEmailProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [cooldown, setCooldown] = useState(cooldownStartTime);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const isOutOfAttempts = totalAttempts >= maxAttemptsCount;

  const isButtonDisabled = cooldown > 0 || isOutOfAttempts;

  async function handleResentEmail() {
    const nextAttempts = totalAttempts + 1;

    if (nextAttempts > maxAttemptsCount) {
      toast.dismiss();
      toast.error('Número máximo de tentativas atingido');
      setTotalAttempts(maxAttemptsCount);
      return;
    }

    setStatus('submitting');
    setCooldown(cooldownStartTime);
    setTotalAttempts(nextAttempts);

    try {
      const formData = new FormData();
      formData.append('email', userEmail);

      await ForgetPasswordAction(null, formData);

      logColor(
        'Send reset email Form:',
        JSON.stringify(Object.fromEntries(formData)),
      );
    } catch (error) {
      toast.error('Falha ao reenviar o e-mail.');
    } finally {
      setStatus('sent');
    }
  }

  useEffect(() => {
    if (cooldown <= 0) return;

    const id = setTimeout(() => setCooldown(c => c - 1), 1000);

    return () => clearTimeout(id);
  }, [cooldown]);

  const resentButton = (
    <ButtonComponent
      styleType='ghost'
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200',
        ' bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition',
        ' hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60',
        'font-semibold',
      )}
      disabled={isButtonDisabled}
      onClick={handleResentEmail}
    >
      <RefreshCcwIcon className='h-4 w-4' />
      {cooldown > 0 ? `Reenviar em ${cooldown}s` : 'Reenviar código'}
    </ButtonComponent>
  );

  return (
    <div className='mb-8'>
      <div className='flex gap-3'>
        <div
          className={clsx(
            'mb-4 grid h-11 w-11 place-items-center rounded-xl bg-emerald-500',
            'text-white shadow-md',
          )}
        >
          <CircleCheckBigIcon className='h-5 w-5' />
        </div>
        <h1 className='text-4xl font-medium'>Identificação</h1>
      </div>

      <div>
        {' '}
        <CodeInputForm email={userEmail} />
        <div className='flex justify-between mb-5'>
          {!isOutOfAttempts ? resentButton : <MaxRetryButton />}

          <div className='flex items-center'>
            <ButtonComponent
              onClick={onValueChange}
              styleType='custom'
              className={clsx(
                'text-xs text-slate-500 font-semibold',
                ' underline-offset-4 hover:underline hover:text-slate-950 hover:cursor-pointer',
              )}
            >
              Usar outro e-mail
            </ButtonComponent>
          </div>
        </div>
        <div className='mt-6 border border-slate-200 p-4 rounded-xl'>
          <p className='text-justify text-xs leading-relaxed text-slate-600'>
            <span className='font-medium text-slate-900'>Não recebeu?</span>{' '}
            Verifique a caixa de spam, confirme se o endereço está correto e
            aguarde alguns minutos antes de tentar novamente.
          </p>
        </div>
      </div>
    </div>
  );
}
