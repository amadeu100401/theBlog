'use server';

import { Auth } from '@/shared/constants/system_const';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function DoLogoutAction() {
  (await cookies()).set(Auth.AUTH_TOKEN, '');

  revalidatePath('/', 'layout');
  redirect('/');
}
