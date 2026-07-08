import { EmailButton, EmailLayout, EmailText, EmailTitle } from './components';

type ResetEmailTemplateProps = {
  name: string;
  resetLink?: string;
};

export function ResetEmailTemplate({
  name,
  resetLink = 'https://www.google.com.br',
}: ResetEmailTemplateProps) {
  return (
    <EmailLayout preview={'Recuperação de senha'}>
      <EmailTitle>Recuperação de senha</EmailTitle>

      <EmailText>
        Olá <strong>{name}</strong>!
      </EmailText>

      <EmailText>Recebemos uma solicitação para redefinir sua senha.</EmailText>

      <EmailButton href={resetLink}>Redefinir senha</EmailButton>

      <EmailText>Este link expira em 30 minutos.</EmailText>
    </EmailLayout>
  );
}
