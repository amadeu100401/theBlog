import type { Metadata } from 'next';
import './globals.css';
import { Container } from '../presentation/components/Container';
import { Header } from '../presentation/components/BlogTitle';
import { Footer } from '@/presentation/components/Footer/inde';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/presentation/components/ui/sonner';
import { SiteHeader } from '@/presentation/components/NavMenu';

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
        <SiteHeader />
        <Container>
          {children}
          <Footer />
        </Container>
        <Toaster
          position='top-center'
          swipeDirections={['left', 'right']}
          toastOptions={{
            duration: 5000,
          }}
        />
      </body>
    </html>
  );
}
