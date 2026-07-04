export type LoginResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  toke: string;
};
