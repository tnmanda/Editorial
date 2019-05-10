import { Investigation } from '../models/investigation.model';
import { Reason } from '../models/reason.model';
import { Entity } from '../models/entity.model';
import { InvestigationNote } from '../models/investigation-note.model';
import { InvestigationActivity } from '../models/investigation-activity.model';

export interface IInvestigationEntityObject {
  investigation: Investigation;
  reason: Reason;
  entity?: Entity;
  notes: InvestigationNote[];
  activity: InvestigationActivity[];
}
