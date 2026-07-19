import Link from 'next/link';

export function RedirectButton() {
  return (
    <div className='mt-10 flex flex-col gap-6 items-center justify-center p-8 bg-slate-50/50 rounded-2xl border border-slate-100 max-w-md mx-auto shadow-sm'>
      <div className='text-center'>
        <h2 className='text-lg font-semibold text-slate-900 tracking-tight'>
          O que deseja fazer?
        </h2>
        <p className='text-sm text-slate-500 mt-1'>
          Escolha uma das opções abaixo para continuar.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-3 w-full justify-center'>
        <Link
          href='/'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.99] rounded-xl shadow-sm transition-all duration-200 ease-in-out w-full sm:w-auto'
        >
          Tela Principal
        </Link>

        <Link
          href='/forgot-password'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 active:scale-[0.99] border border-slate-200 rounded-xl shadow-sm transition-all duration-200 ease-in-out w-full sm:w-auto'
        >
          Esqueci minha senha
        </Link>
      </div>
    </div>
  );
}
