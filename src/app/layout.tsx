import type { Metadata } from 'next';
import './globals.css';
import { Container } from '../presentation/components/Container';
import { Footer } from '@/presentation/components/Footer';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/presentation/components/ui/sonner';
import { Suspense } from 'react';
import {
  SiteHeaderSkeleton,
  SiteHeaderWrapper,
} from '@/presentation/components/SiteHeaderWrapper';
import { TooltipProvider } from '@/components/ui/tooltip';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: { default: 'The Blog', template: '%s | The Blog' },
  description: 'Este é um blog com Next.JS',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Tema claro e escuro
    <html lang='pt-BR' className={cn('light', 'font-sans', geist.variable)}>
      <body className='bg-slate-100'>
        <Suspense fallback={<SiteHeaderSkeleton />}>
          <SiteHeaderWrapper />
        </Suspense>
        <TooltipProvider>
          <Container>{children}</Container>
        </TooltipProvider>
        <Toaster
          position='top-center'
          swipeDirections={['left', 'right']}
          toastOptions={{
            duration: 5000,
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
