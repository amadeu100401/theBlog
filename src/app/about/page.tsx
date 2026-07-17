import { AboutContent } from '@/presentation/components/About/inde';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <main className='min-h-20 mb-16 py-8'>
      <AboutContent />
    </main>
  );
}
