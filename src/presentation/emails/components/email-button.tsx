import { Button } from '@react-email/components';

type Props = {
  href: string;
  children: React.ReactNode;
};

export function EmailButton({ href, children }: Props) {
  const safeHref = /^https?:\/\//i.test(href) ? href : `https://${href}`;

  return (
    <Button
      href={safeHref}
      style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '14px 28px',
        borderRadius: '8px',
        fontWeight: 600,
        textDecoration: 'none',
        display: 'inline-block',
        marginTop: '24px',
      }}
    >
      {children}
    </Button>
  );
}
