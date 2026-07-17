'use client';

import { ClockIcon } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type ResetPasswordTimerProps = {
  isTokenExpired: boolean;
  onTimeout: () => void;
};

export function ResetPasswordTimer({
  isTokenExpired,
  onTimeout,
}: ResetPasswordTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(!isTokenExpired ? 15 * 60 : 0);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeout();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeout, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const expired = secondsLeft <= 0;
  return (
    <div
      className={clsx(
        'mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs shadow-sm',
        expired
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-slate-200 bg-white text-slate-600',
      )}
    >
      <ClockIcon className='h-3.5 w-3.5' />

      {expired ? (
        <span>Link expirado</span>
      ) : (
        <>
          Este link expira em
          <span className='font-medium'>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </>
      )}
    </div>
  );
}
