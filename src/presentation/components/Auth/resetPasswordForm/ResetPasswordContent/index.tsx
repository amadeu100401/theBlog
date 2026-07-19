'use client';

import { maskedEmail } from '@/shared/util/mask-email';
import { ResetPassword } from '..';
import { useCallback, useState } from 'react';
import ResetPasswordTimer from '../ResetPasswordClock';
import { RootErrorPage } from '../ResetPasswordFail';
import { RedirectButton } from '../ResetPasswordFail/index-button';

interface ResetPasswordContentProps {
  isFail?: boolean;
  isTokenExpired: boolean;
  email: string | undefined;
}

export function ResetPasswordContent({
  isFail = false,
  isTokenExpired,
  email,
}: ResetPasswordContentProps) {
  const [isExpired, setIsExpired] = useState<boolean>(isTokenExpired);
  const [userEmail, setUserEmail] = useState<string>('');

  if (email !== undefined) {
    setUserEmail(email);
  }

  const handleTimeout = useCallback((): void => {
    setIsExpired(true);
  }, []);

  return (
    <>
      {/* <div>
        <ResetPasswordTimer onTimeout={handleTimeout} expiresAt={15} />
      </div> */}
      <p className='mt-2 text-sm text-slate-500'>
        {userEmail || userEmail.trim() !== '' ? (
          <>
            Redefinindo o acesso de{' '}
            <span className='font-medium text-slate-900'>
              {maskedEmail(userEmail)}
            </span>
            .{' '}
          </>
        ) : null}
      </p>
      <p className='mt-2 text-sm text-slate-500'>
        {' '}
        {isFail ? (
          <RootErrorPage
            message={
              isExpired
                ? 'O link de redefinição expirou. Solicite um novo link.'
                : ''
            }
          />
        ) : (
          'Escolha uma senha forte que você ainda não tenha usado.'
        )}
      </p>
      {isFail ? (
        // <RedirectButton />
        ''
      ) : (
        <ResetPassword email={userEmail} isTimeout={isExpired} />
      )}
    </>
  );
}
