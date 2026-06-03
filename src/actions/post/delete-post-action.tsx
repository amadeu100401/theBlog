'use server';

import { simulateAwait } from '@/util/async-delay';
import { logColor } from '@/util/log-color';

export async function deletePostAction(id: string) {
  // const id = formData.get('id');
  await simulateAwait('deletePostAction', false, 2000);

  logColor('' + id);
}
