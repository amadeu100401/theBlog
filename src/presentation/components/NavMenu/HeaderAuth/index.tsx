import { GetSession } from '@/presentation/actions/auth/GetSession';
import { AuthButtons } from '../../AuthButtons';
import { AccountMenu } from '../../AccountMenu';

export async function HeaderAuth() {
  const user = await GetSession();

  if (!user) {
    return <AuthButtons />;
  }

  return <AccountMenu user={user} />;
}
