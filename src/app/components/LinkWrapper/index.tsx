import Link from 'next/link';

type LinkWrapperProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<'a'>;

export function LinkWrapper({ children, href, ...props }: LinkWrapperProps) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
