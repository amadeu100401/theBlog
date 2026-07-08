import { Heading, Section } from '@react-email/components';

export function EmailHeader() {
  return (
    <Section
      style={{
        marginBottom: '32px',
      }}
    >
      <Heading
        style={{
          fontSize: '28px',
          margin: 0,
          color: '#0f172a',
        }}
      >
        The Blog
      </Heading>
    </Section>
  );
}
