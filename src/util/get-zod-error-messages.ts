import { ZodFormattedError } from 'zod';

function hasErrors(value: unknown): value is { _errors: string[] } {
  return typeof value === 'object' && value !== null && '_errors' in value;
}

export function getZodErrorMessages<T>(error: ZodFormattedError<T>): string[] {
  return Object.values(error).flatMap(field => {
    if (Array.isArray(field)) return field;
    if (hasErrors(field)) return field._errors;
    return [];
  });
}
