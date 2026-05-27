'use client'; // -> cuidado com o use client, porque qualquer component que você importar dentro de um use client ele sai de server component para um client component, podendo vazar dados.
// Para contornar isso, podemos usar children ao invez de importar dentro do client component

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
