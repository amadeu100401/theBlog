import { AuthHeading } from '@/presentation/components/Auth/authHeading';
import { LoginForm } from '@/presentation/components/Auth/loginForm';

export default async function AdminLoginPage() {
  return (
    <main className='flex min-h-screen justify-center items-center'>
      <div className='w-full max-w-md'>
        <AuthHeading type='login' />
        <LoginForm />
      </div>
    </main>
  );
}
