import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateTime(rawDate: string): string {
  const date = new Date(rawDate);

  if (isNaN(date.getTime())) {
    return '';
  }

  return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR,
  });
}

export function formatRelativeDateTime(rawDate: string): string {
  const date = new Date(rawDate);

  if (isNaN(date.getTime())) {
    return '';
  }

  return formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
}

// const rawDate = new Date().toISOString();
// console.log('Raw Date: ', rawDate);
// console.log('Formatada: ', formatRelativeDateTime(rawDate));
