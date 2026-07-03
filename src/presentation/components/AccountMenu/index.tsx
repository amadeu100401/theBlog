import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { userSession as UserSession } from '../Header';
import clsx from 'clsx';
import {
  ChevronDownIcon,
  FileTextIcon,
  LogOutIcon,
  PenSquareIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';

type AccountMenuProps = {
  user: UserSession;
};

export function AccountMenu({ user }: AccountMenuProps) {
  const initials = user?.name
    .split(' ')
    .map(s => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={clsx(
            'inline-flex items-center gap-2 rounded-full border',
            'border-slate-200 bg-white p-1 pr-3',
            'text-sm font-medium text-slate-700 shadow-sm transition-colors',
            'hover:bg-slate-50 hover:cursor-pointer',
          )}
          role='button'
          tabIndex={0}
        >
          <span className='grid h-7 w-7 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white'>
            {initials}
          </span>
          <span className='hidden sm:inline'>{user?.name.split(' ')[0]}</span>
          <ChevronDownIcon className='h-3.5 w-3.5 text-slate-400' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-64'>
        <DropdownMenuGroup>
          <DropdownMenuLabel className={'flex flex-col gap-0.5'}>
            <span className='text-sm font-semibold text-slate-900'>
              {user?.name}
            </span>
            <span className='text-xs font-semibold text-slate-500'>
              {user?.email}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={'p-0'}>
          <Link
            href='/admin/profile'
            className='flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100'
          >
            <UserIcon className='h-4 w-4 shrink-0' />
            <span>Meu perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={'p-0'}>
          <Link
            href='/admin/post'
            className='flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100'
          >
            <FileTextIcon className='h-4 w-4' />
            <span>Meus posts</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={'p-0'}>
          <Link
            href='/admin/post/new'
            className='cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100'
          >
            <PenSquareIcon className='h-4 w-4' /> Novo post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={'p-0'}>
          <Link
            href='/'
            className='cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100'
          >
            <SettingsIcon className='h-4 w-4' /> Configurações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='p-0 cursor-pointer text-red-600 focus:text-red-600 '>
          <div className='px-3 gap-2 flex w-full items-center m-1.5'>
            <LogOutIcon className='h-4 w-4' /> Sair
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
