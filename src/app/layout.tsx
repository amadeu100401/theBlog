import type { Metadata } from 'next';
import './globals.css';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Footer } from '@/components/Footer/inde';

export const metadata: Metadata = {
  title: { default: 'The Blog', template: '%s | The Blog' },
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
      <body>
        <Container>
          <Header />

          {children}

          <Footer />
        </Container>
      </body>
    </html>
  );
}
