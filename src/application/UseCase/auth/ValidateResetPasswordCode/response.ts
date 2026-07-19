export type ResponseValidateCode =
  | {
      success: true;
      token: string;
    }
  | {
      success: false;
      error: ErrorValidateCodeType;
    };

export enum ErrorValidateCodeType {
  USER_NOT_FOUNDED = 'O usuário não foi encontrado',
  CODE_INVALID = 'O código informado é inválido',
  CODE_EXPIRED = 'O código informádo expirou',
}
