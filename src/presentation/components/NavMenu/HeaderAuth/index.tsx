import { AuthButtons } from '../AuthButtons';
import { AccountMenu } from '../../AccountMenu';
import { GetSessionAction } from '@/presentation/actions/auth/GetSession';

export async function HeaderAuth() {
  const result = await GetSessionAction(null, null);

  if (!result || !result.success) {
    return <AuthButtons />;
  }

  const user = result.user;

  if (!user) {
    return <AuthButtons />;
  }

  return <AccountMenu user={user} />;
}
