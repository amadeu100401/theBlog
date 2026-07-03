import { Header } from '@/presentation/components/BlogTitle';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <Header />
      {children}
    </main>
  );
}
