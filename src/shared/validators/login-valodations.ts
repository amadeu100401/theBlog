import z from 'zod';

const LoginBaseSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'O email é obrigatório')
    .email('O email deve ser válido'),
  password: z
    .string()
    .trim()
    .min(12, 'A senha deve ter ao menos 12 cracateres')
    .max(64, 'A senha não deve passar de 64 caracteres')
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~])[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~]+$/,
      'A senha deve conter ao menos uma letra maiúscula, um número e um caractere especial',
    )
    .refine(val => !/^(.)\1+$/.test(val), {
      message: 'A senha não pode ser composta por apenas um caractere repetido',
    }),
});

export const DoLoginSchema = LoginBaseSchema;
