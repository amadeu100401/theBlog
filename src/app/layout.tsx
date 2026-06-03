import type { Metadata } from 'next';
import './globals.css';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Footer } from '@/components/Footer/inde';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
    <html lang='pt-BR' className={cn('light', 'font-sans', geist.variable)}>
      <body>
        <Container>
          <Header />

          {children}

          <Footer />
          <Toaster
            richColors
            position='top-center'
            swipeDirections={['left', 'right']}
            toastOptions={{
              duration: 5000,
            }}
          />
        </Container>
      </body>
    </html>
  );
}
