'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { VerifyResetCodeAction } from '@/presentation/actions/auth/VerifyResetCode';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

type CodeInputForm = {
  email: string;
};

export function CodeInputForm({ email }: CodeInputForm) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOTPComplete = async (code: string) => {
    setErrorMessage(null);

    startTransition(async () => {
      toast.dismiss();
      const result = await VerifyResetCodeAction({ email, code });

      if (!result || result === undefined) {
        toast.error('Erro ao realizar verificação do código');
        return;
      }

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success('Código validado com sucesso!');
    });
  };

  return (
    <section className='flex flex-col mb-10 gap-3'>
      <div className=''>
        <label className='text-sm font-medium text-slate-900 uppercase tracking-wider mb-4'>
          {isPending ? 'Validando código...' : 'Informe o código'}
        </label>
        <p className='mt-2 text-slate-600 text-sm text-justify'>
          Enviamos um código de 4 dígitos para seu e-mail cadastrado. Ele expira
          em breve.
        </p>
      </div>
      <div className='bg-white border border-slate-300 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center'>
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          disabled={isPending}
          onComplete={handleOTPComplete}
        >
          <div className='flex gap-3'>
            {[0, 1, 2, 3].map(index => (
              <InputOTPGroup
                key={index}
                className='*:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:text-2xl *:data-[slot=input-otp-slot]:font-bold *:data-[slot=input-otp-slot]:rounded-xl *:data-[slot=input-otp-slot]:border-slate-200 *:data-[slot=input-otp-slot]:bg-slate-50/50 focus-within:*:data-[slot=input-otp-slot]:border-slate-900 transition-all'
              >
                <InputOTPSlot index={index} className='border' />
              </InputOTPGroup>
            ))}
          </div>
        </InputOTP>
        {/* Mensagem de Erro amigável */}
        {errorMessage && (
          <p className='text-sm font-medium text-red-500 mt-4 text-center'>
            {errorMessage}
          </p>
        )}
      </div>
      <p className='text-xs text-slate-400 mt-4 leading-relaxed'>
        <strong className='text-slate-500 font-medium'>Dica:</strong> Verifique
        a caixa de spam ou promoções. O e-mail pode levar até 1 minuto para
        chegar.
      </p>
    </section>
  );
}
