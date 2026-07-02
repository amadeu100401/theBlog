'use client';

import { formatRelativeDateTime } from '@/shared/util/format-datetime';

type PostDateProps = {
  createdAt: string;
};

export function PostDate({ createdAt }: PostDateProps) {
  return (
    <time
      className='text-slate-600 text-sm'
      dateTime={createdAt}
      title={formatRelativeDateTime(createdAt)}
    >
      {formatRelativeDateTime(createdAt)}
    </time>
  );
}
