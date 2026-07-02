import { AuthHeading } from '@/presentation/components/Auth/authHeading';
import { RegisterUserForm } from '@/presentation/components/Auth/registeForm';
import { SocialButton } from '@/presentation/components/Auth/socialButton';

export default function Register() {
  return (
    <main className='flex min-h-screen justify-center'>
      <div className='w-full max-w-md'>
        <AuthHeading type='create' />

        {/* <div className='mt-6 flex gap-3'>
          <SocialButton provider='google' />
          <SocialButton provider='github' />
        </div>

        <div className='my-4 flex items-center gap-3 text-xs text-slate-400'>
          <div className='h-px flex-1 bg-slate-300' />
          <span className='whitespace-nowrap'>ou continue com e-mail</span>
          <div className='h-px flex-1 bg-slate-300' />
        </div> */}

        <RegisterUserForm />
        <div className='flex items-center justify-center '>
          <span className='text-sm text-slate-600 font-light'>
            Protegido por criptografia de ponta a ponta.
          </span>
        </div>
      </div>
    </main>
  );
}
