import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { ForgetPasswordRequest } from './request';
import { EmailServices } from '@/domain/services/email/Email';
import { ResetEmailTemplate } from '@/presentation/emails/reset-password.email';
import { render } from '@react-email/render';
import { buildUrl } from '@/shared/util/build-url';
import { TokenService } from '@/domain/services/token/Token';

export class ForgetPasswordUseCase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailServices,
  ) {}

  public async execute(data: ForgetPasswordRequest): Promise<void> {
    const email = data.email.getValue();

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) return;

    const endpoint = 'reset-password/';

    const resetPasswordToken = await this.tokenService.generate({
      email: user.email.getValue(),
      role: user.role,
      sub: user.id,
      type: 'RESET_PASSWORD',
    });

    const resetLink = buildUrl(endpoint, {
      token: resetPasswordToken,
    });

    const content = ResetEmailTemplate({
      name: user.name,
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
