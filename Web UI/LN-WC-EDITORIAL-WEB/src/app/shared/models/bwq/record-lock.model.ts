import { IRecordLock } from '../../interfaces/bwq/record-lock.interface';

export class RecordLock implements IRecordLock {
  workUnitTypeID: number;
  appUserID: string;
  idFromWorkUnitsDBTable: number;
}
