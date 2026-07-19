import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { ForgetPasswordRequest } from './request';
import { EmailServices } from '@/domain/services/email/Email';
import { ResetEmailTemplate } from '@/presentation/emails/reset-password.email';
import { render } from '@react-email/render';
import { TokenService } from '@/domain/services/token/Token';
import { CacheProvider } from '@/domain/contracts/cache-provider';

export class ForgetPasswordUseCase {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailServices,
    private readonly cacheProvider: CacheProvider,
  ) {}

  public async execute(data: ForgetPasswordRequest): Promise<void> {
    const email = data.email.getValue();

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) return;

    const cacheKey = `reset_code_${user.email.getValue()}`;

    const cachedRequest = await this.cacheProvider.get(cacheKey);

    if (cachedRequest) {
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const content = ResetEmailTemplate({
      name: user.name,
      resetCode: code,
    });

    await this.cacheProvider.set(cacheKey, code, 600);

    const htmlString = await render(content);

    const emailRequest = {
      to: user.email.getValue(),
      subject: 'Redefinição de senha',
      html: htmlString,
    };

    this.emailService.sendEmail(emailRequest);
  }
}
