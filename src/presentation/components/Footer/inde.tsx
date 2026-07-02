import Link from 'next/link';
import { LinkWrapper } from '../LinkWrapper';

export function Footer() {
  return (
    <footer>
      <h1 className='pb-16 text-center'>
        <p className='py-8'>
          {/* <span>Copyright &copy; {new Date().getFullYear()} - </span> */}
          <span>Copyright &copy; 2026 - </span>
          <Link href='/' about='Home page'>
            The Blog
          </Link>
        </p>
      </h1>
    </footer>
  );
}
