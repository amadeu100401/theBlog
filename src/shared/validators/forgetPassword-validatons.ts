import z from 'zod';

const ForgetPasswordBaseSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'O email é obrigatório')
    .email('O email deve ser válido'),
});

export const ForgetPasswordSchema = ForgetPasswordBaseSchema;
