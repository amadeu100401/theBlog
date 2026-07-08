import { Heading } from '@react-email/components';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function EmailTitle({ children }: Props) {
  return (
    <Heading
      style={{
        fontSize: '24px',
        color: '#0f172a',
        marginBottom: '20px',
      }}
    >
      {children}
    </Heading>
  );
}
