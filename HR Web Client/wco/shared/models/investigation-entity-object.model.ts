import { IInvestigationEntityObject } from '../interfaces/investigation-entity-object.interface';
import { Investigation } from './investigation.model';
import { Reason } from './reason.model';
import { Entity } from './entity.model';
import { InvestigationNote } from './investigation-note.model';
import { InvestigationActivity } from './investigation-activity.model';
import { RecordLock } from './record-lock.model';

export class InvestigationEntityObject implements IInvestigationEntityObject {
  investigation: Investigation;
  reason: Reason;
  entity?: Entity;
  notes: InvestigationNote[];
  activity: InvestigationActivity[];
  locks?: RecordLock;
}
