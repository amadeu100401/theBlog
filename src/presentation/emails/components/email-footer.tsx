import { Hr, Section, Text } from '@react-email/components';

export function EmailFooter() {
  return (
    <>
      <Hr />

      <Section
        style={{
          marginTop: '24px',
        }}
      >
        <Text
          style={{
            color: '#64748b',
            fontSize: '12px',
            lineHeight: '20px',
          }}
        >
          © {new Date().getFullYear()} The Blog.
        </Text>

        <Text
          style={{
            color: '#64748b',
            fontSize: '12px',
          }}
        >
          Caso você não tenha solicitado este e-mail, basta ignorá-lo.
        </Text>
      </Section>
    </>
  );
}
