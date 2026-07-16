// src/app/(auth)/reset-password/[token]/page.tsx
import { ResetPasswordContainer } from '@/presentation/components/Auth/resetPasswordForm/ResetPasswordContainer';
import { SpinLoader } from '@/presentation/components/SpinLoader';
import { Suspense } from 'react';
interface ResetPasswordPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  return (
    <div className='w-full max-w-md mx-auto p-4 flex flex-col min-h-screen'>
      <Suspense fallback={<SpinLoader />}>
        <ResetPasswordContainer params={params} />
      </Suspense>
    </div>
  );
}
