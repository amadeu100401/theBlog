import { revalidadeExemploAction } from '@/actions/cache/revalidate-exemple';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

async function PageContet({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // const hour = await formatHourCached();

  return (
    <>
      <div>{/* Name: {hour} (ID: {id}) */}</div>

      <form className='py-16' action={revalidadeExemploAction}>
        <input type='hidden' name='path' defaultValue={`/exemplo/${id}`} />

        <button
          className='bg-amber-300 text-white p-2 rounded hover:bg-amber-600 transition shadow-amber-50 cursor-pointer'
          type='submit'
        >
          REVALIDATE
        </button>
      </form>
    </>
  );
}

export default function ExemploDynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <main className='min-h-150 text-4xl font-bold'>
        <PageContet params={params} />
      </main>
    </Suspense>
  );
}
