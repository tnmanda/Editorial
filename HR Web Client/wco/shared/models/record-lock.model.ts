import { IRecordLock } from '../interfaces/record-lock.interface';

export class RecordLock implements IRecordLock {
  workUnitTypeID: number;
  appUserID: string;
  idFromWorkUnitsDBTable: number;
}
