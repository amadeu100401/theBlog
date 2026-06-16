import { ZodFormattedError } from 'zod';

export function getZodErrorMessages<T>(error: ZodFormattedError<T>): string[] {
  const messages: string[] = [];

  function collect(value: unknown): void {
    if (!value || typeof value !== 'object') {
      return;
    }

    if ('_errors' in value && Array.isArray(value._errors)) {
      messages.push(
        ...value._errors.filter(
          (error): error is string => typeof error === 'string',
        ),
      );
    }

    Object.values(value).forEach(collect);
  }

  collect(error);

  return messages;
}
