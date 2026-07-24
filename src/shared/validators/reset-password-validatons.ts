import z from 'zod';

const ResetPasswordBaseSchema = z
  .object({
    email: z.string().trim().email('O email deve ser informado'),
    password: z
      .string()
      .trim()
      .min(12, 'A senha deve ter ao menos 12 cracateres')
      .max(64, 'A senha não deve passar de 64 caracteres')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~])[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~]+$/,
        'A senha deve conter ao menos uma letra maiúscula, um número e um caractere especial',
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(12, 'A senha deve ter ao menos 12 cracateres')
      .max(64, 'A senha não deve passar de 64 caracteres')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~])[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~]+$/,
        'A senha deve conter ao menos uma letra maiúscula, um número e um caractere especial',
      ),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não concidem',
    path: ['confirmPassword'],
  });

export const resetPasswordRequest = ResetPasswordBaseSchema;
