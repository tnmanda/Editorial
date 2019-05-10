import { IAppUserCertificate } from '../../../interfaces/admin/app_user/app-user-certificate.interface';
import { CertificateType } from '../types/certificate-type.model';

export class AppUserCertificate implements IAppUserCertificate {
  appUserCertificateID: number;
  appUserID: number;
  certificateTypeID: number;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;

  certificateType: CertificateType;
}
