export type ResetPasswordResponse =
  | {
      status: true;
    }
  | { status: false; message: ResetPasswordErroType };

export enum ResetPasswordErroType {
  SAME_PASSWORD = 'as senhas devem ser diferentes',
  NO_PASSWOR_OR_EMAIL = 'o email e senha devem ser preenchidos',
  USER_NOUT_FOUNDED = 'usuário não encontrado',
  ERRO__AT_UPDATE = 'erro ao atualizar a senha',
}
