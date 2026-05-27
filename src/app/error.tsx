'use client';

import { ErrorMessage } from '@/components/ErrorMessage';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error, reset }: ErrorProps) {
  // Fazendo o log do error caso necessário
  // useEffect(() => {
  //   console.log(error);
  // }, [error]);

  return (
    <ErrorMessage
      pageTitle={'Internal Server Error'}
      contentTitle={'501'}
      content={
        // <button onClick={() => reset}>Click para tentar novamente</button> -> Função de reset para caso deseje tentar novamente
        'Ocorreu um erro na nossa aplicação. Tente novamente mais tarde!'
      }
    />
  );
}
