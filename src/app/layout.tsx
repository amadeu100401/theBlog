import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Blog',
  description: 'Este é um blog com Next.JS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Tema claro e escuro
    <html lang='pt-BR' className='light'>
      <body>{children}</body>
    </html>
  );
}
