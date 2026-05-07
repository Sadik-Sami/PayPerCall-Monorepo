import { z } from 'zod';

export const blogBlockTypeSchema = z.enum([
  'paragraph',
  'heading',
  'image',
  'gallery',
  'quote',
  'code',
  'bullet_list',
  'ordered_list',
  'divider',
]);

export const blogBlockContentSchema = z
  .looseObject({
    type: z.string().min(1, 'Block content.type is required'),
  })

export const blockCreateSchema = z.object({
  type: blogBlockTypeSchema,
  content: blogBlockContentSchema,
});

export const blockUpdateSchema = z.object({
  content: blogBlockContentSchema,
});

export const blockReorderSchema = z.object({
  blogId: z.string().uuid('Blog ID must be a valid UUID'),
  orderedBlockIds: z
    .array(z.string().uuid('Block ID must be a valid UUID'))
    .min(1, 'At least one block is required')
    .refine((ids) => new Set(ids).size === ids.length, {
      message: 'Block IDs must be unique',
    }),
});

export type BlockCreateInput = z.infer<typeof blockCreateSchema>;
export type BlockUpdateInput = z.infer<typeof blockUpdateSchema>;

