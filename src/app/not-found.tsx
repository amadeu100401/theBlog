import { ErrorMessage } from '@/components/ErrorMessage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página não encontrada',
};

export default function NotFount() {
  return (
    <ErrorMessage
      pageTitle={'Página não encontrada'}
      contentTitle={'404'}
      content={
        'Error 404 - A página que você está tentando acessar não existe nesse site'
      }
    />
  );
}
