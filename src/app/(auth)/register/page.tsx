import { RegisterUserForm } from '@/components/Auth/registeForm';
import clsx from 'clsx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar usuário',
};

export default async function Register() {
  return (
    <div className={clsx('')}>
      <RegisterUserForm />
    </div>
  );
}
