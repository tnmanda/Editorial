import { ICertificateType } from '../../../interfaces/admin/types/certificate-type.interface';

export class CertificateType implements ICertificateType {
  certificateTypeID: number;
  certificateTypeName: string;
  certificateTypeDesc: string;
  isInList: boolean;
  isActive: boolean;
  createdBy: string;
  dateCreatedUTC: string;
  updatedBy: string;
  lastUpdatedUTC: string;
}
