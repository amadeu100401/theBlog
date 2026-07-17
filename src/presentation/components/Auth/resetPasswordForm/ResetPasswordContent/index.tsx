'use client';

import { maskedEmail } from '@/shared/util/mask-email';
import { ResetPassword } from '..';
import { ResetPasswordTimer } from '../ResetPasswordClock';
import { useCallback, useState } from 'react';

interface ResetPasswordContentProps {
  isTokenExpired: boolean;
  email: string;
}

export function ResetPasswordContent({
  isTokenExpired,
  email,
}: ResetPasswordContentProps) {
  const [isExpired, setIsExpired] = useState<boolean>(isTokenExpired);

  const handleTimeout = useCallback((): void => {
    setIsExpired(true);
  }, []);

  return (
    <>
      <div>
        <ResetPasswordTimer
          onTimeout={handleTimeout}
          isTokenExpired={isTokenExpired}
        />
      </div>
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
      </p>
      <p className='mt-2 text-sm text-slate-500'>
        {' '}
        {isExpired
          ? 'O link de redefinição expirou. Solicite um novo link.'
          : 'Escolha uma senha forte que você ainda não tenha usado.'}
      </p>
      <ResetPassword email={email} isTimeout={isExpired} />
    </>
  );
}
