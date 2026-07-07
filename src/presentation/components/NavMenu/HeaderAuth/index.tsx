import { AuthButtons } from '../../AuthButtons';
import { AccountMenu } from '../../AccountMenu';
import { container } from '@/infrastructure/di/container';

export async function HeaderAuth() {
  const useCase = container.getSessionUseCase;

  const result = await useCase.execute();

  if (!result || !result.status) {
    return <AuthButtons />;
  }

  const user = result.session;

  if (!user) {
    return <AuthButtons />;
  }

  return <AccountMenu user={user} />;
}
