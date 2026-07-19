export type SessionResponse =
  | {
      status: true;
      session: {
        name: string;
        email: string;
        avatarUrl: string | null | undefined;
      };
    }
  | {
      status: false;
      error: ErrorType;
    };

export enum ErrorType {
  ERROR_GET_SESSION = 'Não foi possível obter dados da sessão',
  TOKEN_EXPIRED = 'Token expirado',
  ERROR_GET_USER = 'Não foi possível obter dados do usário',
}
