import Link from 'next/link';
import { LogInIcon, UserPlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AuthButtons() {
  return (
    <div className='hidden items-center gap-2 md:flex'>
      <Link href={'/login'}>
        <Button
          variant={'ghost'}
          className='h-9 text-slate-700 hover:bg-slate-100/40 hover:text-slate-900 hover:font-medium hover:cursor-pointer underline-offset-4 hover:underline hover:shadow'
        >
          <LogInIcon className='h-4 w-4' />
          Entrar
        </Button>
      </Link>
      <Link href={'/register'}>
        <Button className='h-9 bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:cursor-pointer'>
          <UserPlusIcon className='h-4 w-4' />
          Criar Conta
        </Button>
      </Link>
    </div>
  );
}
