import { Text } from '@react-email/components';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function EmailText({ children }: Props) {
  return (
    <Text
      style={{
        fontSize: '16px',
        lineHeight: '28px',
        color: '#334155',
      }}
    >
      {children}
    </Text>
  );
}
