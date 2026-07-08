import { Body, Container, Head, Html, Preview } from '@react-email/components';
import { ReactNode } from 'react';
import { EmailHeader } from '../components/email-header';
import { EmailFooter } from '../components/email-footer';

type Props = {
  preview: string;
  children: ReactNode;
};

export function EmailLayout({ preview, children }: Props) {
  return (
    <Html>
      <Head />

      <Preview>{preview}</Preview>

      <Body
        style={{
          backgroundColor: '#f8fafc',
          fontFamily: 'Inter, Arial, Helvetica, sans-serif',
          margin: 0,
          padding: '40px 0',
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            background: '#ffffff',
            margin: '0 auto',
            borderRadius: '12px',
            padding: '40px',
            border: '1px solid #e2e8f0',
          }}
        >
          <EmailHeader />

          {children}

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}
