import { EmailServices } from '@/domain/services/email/Email';
import { SendEmailDTO } from '@/shared/DTOs/SendEmailDTO';
import { resendClient } from '../resend.client';
import { logColor } from '@/shared/util/log-color';

export class EmailService implements EmailServices {
  async sendEmail(data: SendEmailDTO): Promise<void> {
    if (!data || !data.to || (!data.html && !data.react)) {
      logColor('Email com defeito', JSON.stringify(data));
      return;
    }

    try {
      logColor('Tentativa de envio - ', Date.now().toString());

      const response = await resendClient.emails.send({
        from: 'onboarding@resend.dev',
        to: 'amadeu.m4rtim.dev@gmail.com',
        subject: data.subject,
        html: data.html ? data.html : undefined,
        react: data.html ? undefined : data.react,
      });

      if (response.error) {
        throw response.error;
      }

      logColor('Tentativa de envio concluída - ', Date.now().toString());
    } catch (error) {
      if (error instanceof Error) {
        logColor(
          'Erro ao enviar e-mail via Resend',
          error?.message || JSON.stringify(error),
        );
      }

      throw error;
    }
  }
}
