import { IBwq } from '../../interfaces/bwq/bwq.interface';
import { CollectionItem } from './collection-item.model';
import { BwqInstruction } from './bwq-instruction.model';
import { BwqEntity } from './bwq-entity.model';

export class Bwq implements IBwq {
  batchName: string;
  priority: string;
  bwqDescription: string;
  dateCreatedUTC: string;
  startDateUTC: string;
  dueDateUTC: string;
  total: number;
  remaining: number;
  bwqid: number;
  status: string;
  updatedBy: string;
  lastUpdatedUTC: string;
  createdBy: string;
  percentComplete: number;

  priorityCollectionItemID: number;
  statusCollectionItemID: number;

  instructions: BwqInstruction[];
  ent_IDs: BwqEntity[];
  operation: string;
  description: string;
  startDate: string;
  dueDate: string;

  username: string;
  originalCount: number;
  HRToken: string;

  statusCollectionItem: CollectionItem;
  priorityCollectionItem: CollectionItem;
}
