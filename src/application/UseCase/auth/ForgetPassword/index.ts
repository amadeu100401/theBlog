import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { ForgetPasswordRequest } from './request';
import { EmailServices } from '@/domain/services/email/Email';
import { ResetEmailTemplate } from '@/presentation/emails/reset-password.email';
import { render } from '@react-email/render';

export class ForgetPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailServices,
  ) {}

  public async execute(data: ForgetPasswordRequest): Promise<void> {
    const email = data.email.getValue();

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) return;

    const resetLink = 'https://www.google.com.br';

    const content = ResetEmailTemplate({
      name: user.name,
      //resetLink: 'www.google.com.br',
      resetLink: resetLink,
    });

    const htmlString = await render(content);

    const emailRequest = {
      to: user.email.getValue(),
      subject: 'Redefinição de senha',
      html: htmlString,
    };

    this.emailService.sendEmail(emailRequest);
  }
}
