import { IInvestigationEmail } from '../interfaces/investigation-email.interface';

export class InvestigationEmail implements IInvestigationEmail {
  appUserID: number;
  subject: string;
  message: string;
  recipientEmail: string;
  indexFromWorkTable: number;
}
