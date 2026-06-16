import { $ZodErrorTree } from 'zod/v4/core';

export function getZodErrorMessages<T>(tree: $ZodErrorTree<T>): string[] {
  const messages = [...tree.errors];

  const visit = (node: unknown): void => {
    if (!node || typeof node !== 'object') {
      return;
    }

    if ('errors' in node && Array.isArray(node.errors)) {
      messages.push(...node.errors);
    }

    if ('properties' in node && node.properties) {
      Object.values(node.properties).forEach(visit);
    }

    if ('items' in node && Array.isArray(node.items)) {
      node.items.forEach(visit);
    }
  };

  visit(tree);

  return messages;
}
