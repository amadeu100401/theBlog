'use client';

import { useState } from 'react';
import { NoSendedEmailForm } from './NoSendedForm';
import { SendedEmail } from './SendedForm';

export function ForgotPasswordForm() {
  const [userEmail, setUserEmail] = useState('');
  const [sent, setSent] = useState(false);

  const changeSent = () => {
    setSent(!sent);
    setUserEmail('');
  };

  const getUserEmail = (email: string) => {
    setUserEmail(email);
    setSent(true);
  };

  return (
    <section className='flex items-center justify-center px-6 py-10 sm:px-10'>
      <div className='w-full max-w-md'>
        {!sent ? (
          <NoSendedEmailForm onValueChenge={getUserEmail} />
        ) : (
          <SendedEmail userEmail={userEmail} onValueChange={changeSent} />
        )}
      </div>
    </section>
  );
}
