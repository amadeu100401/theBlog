import { z } from 'zod';

const UserBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'O nome é obrigatório')
    .max(120, 'O nome deve ter um máximo de 120 caracteries'),
  email: z
    .string()
    .trim()
    .min(1, 'Contúdo é obrigatório')
    .email('O email deve ser válido'),
  password: z
    .string()
    .trim()
    .min(8, 'A senha deve ter ao menos 8 cracateres')
    .max(64, 'A senha não deve passar de 64 caracteres')
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~])[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~]+$/,
      'A senha deve conter ao menos uma letra maiúscula, um número e um caractere especial',
    )
    .refine(val => !/^(.)\1+$/.test(val), {
      message: 'A senha não pode ser composta por apenas um caractere repetido',
    }),
  acceptTerms: z.coerce.boolean().default(false),
});

export const UserCreateSchema = UserBaseSchema;
