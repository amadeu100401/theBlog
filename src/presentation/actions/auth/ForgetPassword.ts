'use server';

import { ForgetPasswordRequestBuilder } from '@/application/UseCase/auth/ForgetPassword/request';
import { container } from '@/infrastructure/di/container';
import { ForgetPasswordSchema } from '@/shared/validators/forgetPassword-validatons';

export type ActionState = {
  success: boolean;
  email: string;
  errors?: {
    email?: string[];
  };
} | null;

export async function ForgetPasswordAction(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const parsed = ForgetPasswordSchema.safeParse(rawData);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const parsedBody = parsed.data;

    const useCase = container.sendForgetPasswordEmailUseCase;

    await useCase.execute(ForgetPasswordRequestBuilder(parsedBody.email));

    return {
      success: true,
      email: parsed.data.email,
    };
  } catch {
    return {
      success: false,
    };
  }
}
