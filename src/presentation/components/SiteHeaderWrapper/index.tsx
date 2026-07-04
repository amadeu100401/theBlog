import { GetSession } from '@/presentation/actions/auth/GetSession';
import { SiteHeader } from '../NavMenu';

export async function SiteHeaderWrapper() {
  const userSession = await GetSession();

  return <SiteHeader initialUser={userSession} />;
}

export function SiteHeaderSkeleton() {
  return (
    <div className='w-full h-16 border-b border-slate-200/50 bg-slate-50/50 animate-pulse' />
  );
}
