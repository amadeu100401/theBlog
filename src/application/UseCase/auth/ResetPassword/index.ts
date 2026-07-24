import { UserRepository } from '@/domain/repositories/user-repository.interface';
import { ResetPasswordRequest } from './request';
import { ResetPasswordErroType, ResetPasswordResponse } from './response';
import { Password } from '@/domain/value-objects/Password-hash';

export class ResetPassword {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    if (!data.email && !data.newPassword) {
      return {
        status: false,
        message: ResetPasswordErroType.NO_PASSWOR_OR_EMAIL,
      };
    }

    const user = await this.userRepository.findUserByEmail(data.email);

    if (!user) {
      return {
        status: false,
        message: ResetPasswordErroType.USER_NOUT_FOUNDED,
      };
    }

    const newPassword = Password.createFromPlainText(data.newPassword);

    const result = await this.userRepository.updatePassword(
      user.id,
      newPassword.getHash(),
    );

    if (!result) {
      return {
        status: false,
        message: ResetPasswordErroType.ERRO__AT_UPDATE,
      };
    }

    return {
      status: true,
    };
  }
}
