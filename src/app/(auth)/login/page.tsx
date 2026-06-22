import { AuthHeading } from '@/components/Auth/authHeading';
import { LoginForm } from '@/components/Auth/loginForm';

export default async function AdminLoginPage() {
  return (
    <main className='flex min-h-screen justify-center'>
      <div className='w-full max-w-md'>
        <AuthHeading type='login' />
        <LoginForm />
      </div>
    </main>
  );
}
