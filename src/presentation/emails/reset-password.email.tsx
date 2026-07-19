import { EmailLayout, EmailText, EmailTitle } from './components';

type ResetEmailTemplateProps = {
  name: string;
  resetCode?: string;
};

export function ResetEmailTemplate({
  name,
  resetCode,
}: ResetEmailTemplateProps) {
  return (
    <EmailLayout preview={'Recuperação de senha'}>
      <EmailTitle>Recuperação de senha</EmailTitle>

      <EmailText>
        Olá <strong>{name}</strong>!
      </EmailText>

      <EmailText>
        Recebemos uma solicitação para redefinir sua senha. Use o código de
        verificação abaixo para continuar no sistema:
      </EmailText>
      <div
        style={{
          backgroundColor: '#f1f5f9',
          borderRadius: '12px',
          padding: '16px 24px',
          margin: '24px 0',
          textAlign: 'center',
          border: '1px solid #e2e8f0',
        }}
      >
        <span
          style={{
            fontSize: '32px',
            fontWeight: '700',
            letterSpacing: '6px',
            color: '#0f172a',
            fontFamily: 'monospace',
          }}
        >
          {resetCode}
        </span>
      </div>

      <EmailText>
        Insira esses 4 números na tela de validação do sistema para liberar a
        criação da sua nova senha.
      </EmailText>

      <EmailText>
        Este código é de uso único e expira em 10 minutos por motivos de
        segurança. Se não foi você quem solicitou, pode ignorar este e-mail com
        segurança.
      </EmailText>
    </EmailLayout>
  );
}
