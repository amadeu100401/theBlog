import { SiteHeader } from '../NavMenu';

export const dynamic = 'force-dynamic';

export async function SiteHeaderWrapper() {
  return <SiteHeader />;
}

export function SiteHeaderSkeleton() {
  return (
    <div className='w-full h-16 border-b border-slate-200/50 bg-slate-50/50 animate-pulse' />
  );
}
