'use client';

import clsx from 'clsx';
import { ClockIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  expiresAt: number;
  onTimeout: () => void;
};

export default function ResetPasswordTimer({ expiresAt, onTimeout }: Props) {
  const getRemainingSeconds = () =>
    Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));

  const [secondsLeft, setSecondsLeft] = useState(getRemainingSeconds);

  useEffect(() => {
    if (secondsLeft === 0) {
      onTimeout();
      return;
    }

    const interval = setInterval(() => {
      const remaining = getRemainingSeconds();

      setSecondsLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        onTimeout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onTimeout]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div
      className={clsx(
        'mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs shadow-sm',
        secondsLeft === 0
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-slate-200 bg-white text-slate-600',
      )}
    >
      <ClockIcon className='h-3.5 w-3.5' />

      {secondsLeft === 0 ? (
        <span>Link expirado</span>
      ) : (
        <span>
          Este link expira em{' '}
          <strong className='font-mono'>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </strong>
        </span>
      )}
    </div>
  );
}
