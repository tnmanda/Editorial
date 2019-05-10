import { CollectionItem } from '../../models/bwq/collection-item.model';
import { BwqInstruction } from '../../models/bwq/bwq-instruction.model';
import { BwqEntity } from '../../models/bwq/bwq-entity.model';

export interface IBwq {
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

  statusCollectionItem: CollectionItem;
  priorityCollectionItem: CollectionItem;
}
