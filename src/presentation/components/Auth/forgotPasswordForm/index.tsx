'use client';

import { NoSendedEmailForm } from './NoSendedForm';

export function ForgotPasswordForm() {
  const sent = false;
  return (
    <section className='flex items-center justify-center px-6 py-10 sm:px-10'>
      <div className='w-full max-w-md'>
        {!sent ? <NoSendedEmailForm /> : 'TEste'}
      </div>
    </section>
  );
}
