import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

async function PageContent({ params }: AdminPostIdPageProps) {
  const { id } = await params;

  return <div className='py-16 text-6xl'>AdminPostIdPage {id}</div>;
}

export default function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PageContent params={params} />
    </Suspense>
  );
}
