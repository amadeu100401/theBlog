// 'use client';

// import clsx from 'clsx';
// import { ClockIcon } from 'lucide-react';
// import { useEffect, useState } from 'react';

// type Status = 'idle' | 'submitting' | 'success' | 'invalid';

// type ResetPasswordTimerProps = {
//   token: string;
// };

// export function ResetPasswordTimer({ token }: ResetPasswordTimerProps) {
//   const tokenValid = token.length >= 8;

//   const [status, setStatus] = useState<Status>(tokenValid ? 'idle' : 'invalid');
//   const [tokenTtl, setTokenTtl] = useState(15 * 60);

//   useEffect(() => {
//     if (status !== 'idle') return;
//     if (tokenTtl <= 0) {
//       const t = setTimeout(() => setStatus('invalid'));
//       return () => clearTimeout(t);
//     }
//     const id = setTimeout(() => setTokenTtl(s => s - 1), 1000);
//     console.log(tokenTtl);
//     return () => clearTimeout(id);
//   }, [tokenTtl, status]);

//   function formatTtl(seconds: number) {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s.toString().padStart(2, '0')}`;
//   }

//   return (
//     <div
//       className={clsx(
//         'mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200',
//         ' bg-white px-3 py-1 text-xs text-slate-600 shadow-sm',
//       )}
//     >
//       <ClockIcon className='h-3.5 w-3.5 text-slate-400' />
//       Este link expira em:
//       <span className='font-medium text-slate-900'>{formatTtl(tokenTtl)}</span>
//     </div>
//   );
// }

'use client';

import { ClockIcon } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function ResetPasswordTimer() {
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

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
