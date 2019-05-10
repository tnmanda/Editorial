import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CollectionItem } from '../../../../shared/models/bwq/collection-item.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BwqFieldSelectService } from '../../../../shared/services/bwq/bwq-field-select.service';
import { environment } from '../../../../../environments/environment.prod';
import { Subscription } from 'rxjs';
import { BwqFieldSelect } from '../../../../shared/models/bwq/bwq-field-select.model';
import { BwqInstruction } from '../../../../shared/models/bwq/bwq-instruction.model';
import { GlobalHelperService } from '../../../../shared/helpers/global-helper.service';
import { CollectionItemService } from '../../../../shared/services/bwq/collection-item.service';
import { Bwq } from '../../../../shared/models/bwq/bwq.model';
import { BwqEntity } from 'src/app/shared/models/bwq/bwq-entity.model';
import { BwqService } from 'src/app/shared/services/bwq/bwq.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bwq-add',
  templateUrl: './bwq-add.component.html',
  styleUrls: ['./bwq-add.component.css'],
  providers: [MessageService]
})
export class BwqAddComponent implements OnInit, OnDestroy {

  public items: MenuItem[];
  home: MenuItem;

  priorityCollection: CollectionItem[];
  bwqFieldSelects: BwqFieldSelect[];

  bwqInstructions: BwqInstruction[];
  bwqPriorities: CollectionItem[];
  bwqEntities: BwqEntity[];
  bwqEntitiesCount = 0;
  bwq: Bwq;

  fieldSelectSubscription: Subscription;
  collectionItemAllSubscription: Subscription;
  bwqAddSubscription: Subscription;

  instructionForm: FormGroup;
  bwqForm: FormGroup;

  errorMessage: string;
  error: boolean;

  displaySelectParamDialog = false;

  constructor(private router: Router,
              private globalHelperSrv: GlobalHelperService,
              private datePipe: DatePipe,
              private collectionItemSrv: CollectionItemService,
              private bwqFieldSelectSrv: BwqFieldSelectService,
              private bwqSrv: BwqService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {label: 'BWQ', url: 'bwq-entity-management'},
      {label: 'BWQ Management', url: 'bwq-management'},
      {label: 'Create Batch', url: 'bwq-management/bwq-add'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.genInstructionForm();
    this.genBwqForm();

    this.bwqInstructions = new Array<BwqInstruction>();
    this.bwqEntities = new Array<BwqEntity>();
    this.getFieldSelects();
    // 4 = ID for BWQ priority
    this.getCollectionItems(4);
  }

  genInstructionForm() {
    this.instructionForm = new FormGroup ({
      'bwqFieldSelect' : new FormControl('', Validators.required),
      'instructions' : new FormControl('', Validators.required),
    });
  }

  genBwqForm() {
    this.bwqForm = new FormGroup ({
      'batchName' : new FormControl('', Validators.required),
      'description' : new FormControl('', Validators.required),
      'startDate' : new FormControl('', Validators.required),
      'dueDate' : new FormControl('', Validators.required),
      'priorityCollectionItem' : new FormControl('', Validators.required)
    });
  }

  getCollectionItems(collectionID) {
    this.collectionItemSrv.apiUrl = environment.bwq_management.collection_item.by_collection_id;
    this.collectionItemAllSubscription = this.collectionItemSrv.getByCollectionID(collectionID)
    .subscribe((items: Array<CollectionItem>) => {
        this.bwqPriorities = items;
    });
  }

  getFieldSelects() {
    this.bwqFieldSelectSrv.apiUrl = environment.bwq_management.field_select.root;
    this.fieldSelectSubscription = this.bwqFieldSelectSrv.getAll().subscribe((items: Array<BwqFieldSelect>) => {
      this.bwqFieldSelects = items;
    });
  }

  onSaveInstruction(instructionForm) {
    if (instructionForm.valid) {
      const bwqInstruction = new BwqInstruction();
      bwqInstruction.bwqInstructionFakeGUID = this.globalHelperSrv.generateUUIDv4();
      bwqInstruction.bwqFieldSelectID = instructionForm.value.bwqFieldSelect.bwqFieldSelectID;
      bwqInstruction.bwqFieldSelect = instructionForm.value.bwqFieldSelect;
      bwqInstruction.instructions = instructionForm.value.instructions;

      this.bwqInstructions.push(bwqInstruction);
      this.instructionForm.reset();
      this.genInstructionForm();
      console.log(this.bwqInstructions);
    }
  }

  onDeleteInstruction(bwqInstructionFakeGUID) {
    const index = this.bwqInstructions.findIndex(i => i.bwqInstructionFakeGUID === bwqInstructionFakeGUID);
    this.bwqInstructions.splice(index, 1);
  }

  showSelectParamDialog() {
    this.displaySelectParamDialog = true;
  }

  onSelectParamDialogClose(event) {
    this.displaySelectParamDialog = event;
  }

  onGeneratedBwqEntities(event) {
    this.bwqEntities = event;
    this.bwqEntitiesCount = this.bwqEntities.length;
  }

  onSaveBwq(bwqForm) {
    if (bwqForm.valid) {
      if (this.bwqInstructions.length <= 0) {
        this.errorMessage = 'Error: At least one (1) research item and instruction must be supplied.';
        this.error = true;
      } else if (this.bwqEntities.length <= 0) {
        this.errorMessage = 'Error: Entity list must be supplied before performing save.';
        this.error = true;
      } else {
        this.bwq = bwqForm.value;
        this.bwq.priorityCollectionItemID = this.bwq.priorityCollectionItem.collectionItemID;
        this.bwq.statusCollectionItemID = 9;
        this.bwq.startDate = this.datePipe.transform(this.bwq.startDate, 'MM/dd/yyyy');
        this.bwq.dueDate = this.datePipe.transform(this.bwq.dueDate, 'MM/dd/yyyy');

        this.bwq.instructions = this.bwqInstructions;
        this.bwq.ent_IDs = this.bwqEntities;
        this.bwq.username = this.globalHelperSrv.getCurrentUser();
        this.bwq.originalCount = this.bwqEntities.length;
        this.bwq.HRToken = this.globalHelperSrv.getHRToken();
        this.bwq.priorityCollectionItem = null;

        this.bwqSrv.apiUrl = environment.bwq_management.bwq.root;
        this.bwqAddSubscription = this.bwqSrv.post(this.bwq).subscribe(result => {

          // Post Message
          this.messageService.add({severity: 'success', summary: 'Success Message',
          detail: this.bwq.batchName + ' successfully created.' });

          this.onCancel();
        });
      }
    }
  }

  onClear() {
    this.bwqForm.reset();
    this.instructionForm.reset();
    this.bwqInstructions = new Array<BwqInstruction>();
    this.bwq = new Bwq();
    this.bwqEntities = new Array<BwqEntity>();
    this.bwqEntitiesCount = 0;
  }

  onCancel() {
    this.bwqForm.reset();
    this.instructionForm.reset();
    this.bwqInstructions = null;
    this.bwq = new Bwq();
    this.bwqEntities = new Array<BwqEntity>();
    this.bwqEntitiesCount = 0;

    setTimeout(() => {
      this.router.navigate(['/bwq-management']);
    }, 1000);
  }

  ngOnDestroy() {
    if (this.fieldSelectSubscription) { this.fieldSelectSubscription.unsubscribe(); }
    if (this.collectionItemAllSubscription) { this.collectionItemAllSubscription.unsubscribe(); }
    if (this.bwqAddSubscription) { this.bwqAddSubscription.unsubscribe(); }
  }

}
