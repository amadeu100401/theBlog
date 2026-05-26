import { LinkWrapper } from '../LinkWrapper';

export function Footer() {
  return (
    <footer>
      <h1 className='pb-16 text-center'>
        <p className='py-8'>
          <span>Copyright &copy; {new Date().getFullYear()} - </span>
          <LinkWrapper href='/' about='Home page'>
            The Blog
          </LinkWrapper>
        </p>
      </h1>
    </footer>
  );
}
