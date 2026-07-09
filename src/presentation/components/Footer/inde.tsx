import clsx from 'clsx';
import Link from 'next/link';
export function Footer() {
  return (
    <footer className='flex flex-col justify-center items-center bg-slate-100'>
      <div>
        <h1 className='m-6 text-center'>
          <p>
            <span>Copyright &copy; 2026 - </span>
            <Link
              href='/'
              about='Home page'
              className={clsx(
                'font-semibold underline-offset-4 hover:underline',
              )}
            >
              The Blog
            </Link>
          </p>
        </h1>
      </div>
    </footer>
  );
}
