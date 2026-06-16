export type ActionResult<T> = {
  success: boolean;
  errors?: Record<string, string[]>;
  data?: T;
  message?: string;
};
