import { Component, OnInit, Input, Host, OnDestroy } from '@angular/core';
import { BwqService } from '../../shared/services/bwq.service';
import { wco_environment } from '../../shared/models/wco-environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BwqEntityObject } from '../../shared/models/bwq-entity-object.model';
import { TokenService } from '../../shared/services/token.service';
import { Auth } from '../../shared/models/auth.model';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { BwqDispositions } from '../../shared/models/bwq-dispositions.model';
import { BwqDispositionService } from '../../shared/services/bwq-disposition.service';
import { BwqInstructionService } from '../../shared/services/bwq-instruction.service';
import { HumanReviewFormsControl } from '../../../../human-review-sdk/human-review-forms-control.class';
import { HumanReviewFormsService } from '../../../../human-review-sdk/human-review-forms.service';
import { EditorialFormsService } from '../../shared/services/editorial-forms.service';
import { GlobalHelperService } from '../../shared/helpers/global-helper.service';
import { Instruction, BwqInstructionPostData } from '../../shared/models/instruction.model';

@Component({
  selector: 'hr-bwq-entity',
  templateUrl: './bwq-entity.component.html',
  styleUrls: ['./bwq-entity.component.css']
})
export class BwqEntityComponent extends HumanReviewFormsControl implements OnInit, OnDestroy {

  selectedWorkItemId: string;

  @Input() bwqEntityObject: BwqEntityObject;
  @Input() windowEvent: any;

  bwqDispositions: BwqDispositions[];

  instructions: Instruction[];

  bwqEntityObjectSubscription: Subscription;
  bwqInstructionSubscription: Subscription;
  bwqDispositionsSubscription: Subscription;

  eventListener: any;
  thisInterVal: any;

  apiToken: string;

  displayedColumns = ['item', 'batchName', 'instructions', 'disposition'];

  constructor(private route: ActivatedRoute,
              private tokenService: TokenService,
              private bwqInstructionSrv: BwqInstructionService,
              private bwqDispositionsSrv: BwqDispositionService,
              private bwqSrv: BwqService,
              private globalHelperSrv: GlobalHelperService,
              public editorialFormsSrv: EditorialFormsService, public humanReviewFormsSvc: HumanReviewFormsService
             ) {
    super(editorialFormsSrv.bwqEntityForm, humanReviewFormsSvc);
    console.log(editorialFormsSrv.bwqEntityForm);
  }

  ngOnInit() {
    this.getBwqDispositions();
  }

  getBwqDispositions() {
    this.bwqDispositionsSrv.apiUrl = wco_environment.bwq_management.disposition;
    this.bwqDispositionsSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
    this.bwqDispositionsSubscription = this.bwqDispositionsSrv.getAll().subscribe((items: Array<BwqDispositions>) => {
      this.bwqDispositions = items;

    });
  }

  onSaveReturn(formDirective: FormGroupDirective) {

    if (formDirective.valid) {
        this.instructions = [];
        this.bwqEntityObject.instructions.forEach(item => {
          const instruction = new Instruction();
          const _DispositionControl = 'bwqDispositions' + item.bwqInstructionsID;
          const _InstructionControl = 'instructions' + item.bwqInstructionsID;
          instruction.bwqInstructionsID = item.bwqInstructionsID;
          instruction.bwqEntitiesID = item.bwqEntitiesID;
          instruction.bwqFieldSelectID = item.bwqFieldSelectID;
          instruction.bwqDispositionsID =  <number>this.humanReviewForm.get(_DispositionControl).value;
          instruction.instructions =  <string>this.humanReviewForm.get(_InstructionControl).value;
          instruction.createdBy = item.createdBy;
          instruction.dateCreatedUTC = item.dateCreatedUTC;
          instruction.updatedBy = this.globalHelperSrv.getCurrentUserID();
          instruction.lastUpdatedUTC = new Date().toUTCString();
          this.instructions.push(instruction);
        });

        const bwqInstructionPostData = new BwqInstructionPostData();
        bwqInstructionPostData.instructions = this.instructions;
        bwqInstructionPostData.HRToken = this.globalHelperSrv.getHRToken();

        console.log(bwqInstructionPostData);

        this.bwqInstructionSrv.apiUrl = wco_environment.bwq_management.instruction;
        this.bwqInstructionSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
        this.bwqInstructionSubscription = this.bwqInstructionSrv.put(bwqInstructionPostData).subscribe(result => {
          console.log(this.windowEvent);
          this.onCancel();
          // this.windowEvent.source.postMessage('trigger refresh', this.windowEvent.origin);
          // window.close();
        });
    }
  }

  onCancel() {
    this.windowEvent.source.postMessage('trigger refresh', this.windowEvent.origin);
    this.humanReviewForm.reset();
    window.close();
  }

  ngOnDestroy(): void {
    if (this.bwqInstructionSubscription) { this.bwqInstructionSubscription.unsubscribe(); }
    if (this.bwqDispositionsSubscription) { this.bwqDispositionsSubscription.unsubscribe(); }
  }


}
