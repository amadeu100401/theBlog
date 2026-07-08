import { SendEmailDTO } from '@/shared/DTOs/SendEmailDTO';

export interface EmailServices {
  sendEmail(data: SendEmailDTO): Promise<void>;
}
