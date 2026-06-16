import { isUrlOrRelativaPath } from '@/util/is-url-or-relative-path';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Título deve ter , no mínimo, 3 caracteries')
    .max(120, 'O título deve ter um máximo de 120 caracteries'),
  content: z
    .string()
    .trim()
    .min(3, 'Contúdo é obrigatório')
    .transform(val => sanitizeHtml(val)),
  author: z
    .string()
    .trim()
    .min(4, 'Autor precisa ter um mínimo de 4 caractéries')
    .max(100, 'Nome do autor não deve passar de 100 caracteries'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'Excerto precisa ter um mínimo de 3 caractéries')
    .max(200, 'Nome do autor não deve passar de 200 caracteries'),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativaPath, {
    message: 'URL da capa deve ser uma URL ou um caminho para imagem',
  }),
  // published: z
  //   .union([
  //     z.literal('on'),
  //     z.literal('true'),
  //     z.literal('false'),
  //     z.literal(true),
  //     z.literal(false),
  //     z.literal(null),
  //     z.literal(undefined),
  //   ])
  //   .default(false)
  //   .transform(val => val === 'on' || val === 'true' || val === true),
  published: z.coerce.boolean().default(false),
});

export const PostCreateSchema = PostBaseSchema;

export const PostUpdateSchema = PostBaseSchema.extend({
  // id: z.string().uuid('ID inválid'),
});
