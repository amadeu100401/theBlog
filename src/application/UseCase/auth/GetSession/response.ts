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
      error: 'Não foi possível obter dados da sessão';
    };
