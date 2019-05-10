import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditorialFormsService } from '../../shared/services/editorial-forms.service';
import { ActivatedRoute, ChildActivationEnd } from '@angular/router';

import { BwqInstructionService } from '../../shared/services/bwq-instruction.service';
import { BwqDispositionService } from '../../shared/services/bwq-disposition.service';
import { BwqService } from '../../shared/services/bwq.service';
import { wco_environment } from '../../shared/models/wco-environment';
import { Auth } from '../../shared/models/auth.model';
import { TokenService } from '../../shared/services/token.service';
import { BwqEntityObject } from '../../shared/models/bwq-entity-object.model';
import { Subscription } from 'rxjs';
import { Instruction } from '../../shared/models/instruction.model';
import { BwqEntityComponent } from '../bwq-entity/bwq-entity.component';
import { BwqDispositions } from '../../shared/models/bwq-dispositions.model';

@Component({
  selector: 'hr-bwq-entity-edit',
  templateUrl: './bwq-entity-edit.component.html',
  styleUrls: ['./bwq-entity-edit.component.css']
})
export class BwqEntityEditComponent implements OnInit, OnDestroy {

  selectedWorkItemId: string;

  bwqEntityObject: BwqEntityObject;
  bwqEntityForm: FormGroup;

  bwqEntityObjectSubscription: Subscription;


  eventListener: any;
  event: any;

  constructor(private route: ActivatedRoute,
              private tokenService: TokenService,
              private bwqInstructionSrv: BwqInstructionService,
              private bwqDispositionsSrv: BwqDispositionService,
              private bwqSrv: BwqService,
              private editorialFormsSrv: EditorialFormsService) {
    this.bwqEntityForm = new FormGroup({
      '' : new FormControl('', Validators.required),
    });

    this.eventListener = window.addEventListener('message', this.eventMessage.bind(this), false);
   }

  ngOnInit() {

  }

  eventMessage(event) {
    if (event.origin === wco_environment.editorial_web) {
      this.event = event;
      const jsonToken = JSON.parse(event.data);
      const auth = new Auth();
      auth.apitokendata = jsonToken.apitokendata;
      auth.hrtokendata = jsonToken.hrtokendata;
      auth.isAuthenticated = jsonToken.isAuthenticated;
      this.tokenService.setAuthModel(wco_environment.api_token, auth);
      this.getBwqEntityDetails();
    }
  }

  getBwqEntityDetails() {
    if (this.route.snapshot.params['id']) {
      this.selectedWorkItemId = this.route.snapshot.params['id'];
      this.bwqSrv.apiUrl = wco_environment.bwq_management.entity_by_workitemguid;
      this.bwqSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
      this.bwqEntityObjectSubscription = this.bwqSrv.getBwqEntityObject(this.selectedWorkItemId).subscribe((item: BwqEntityObject) => {
        this.bwqEntityObject = item;

        this.generateForm(this.bwqEntityObject.instructions);
      });
    }
  }

  generateForm(instructions: Instruction[]) {
    instructions.forEach(item => {
      this.bwqEntityForm.addControl('instructions' + item.bwqInstructionsID, new FormControl(item.instructions, Validators.required));
      this.bwqEntityForm.addControl('item' + item.bwqInstructionsID, new FormControl(item.item, Validators.required));
      this.bwqEntityForm.addControl('batchName' + item.bwqInstructionsID, new FormControl(item.batchName, Validators.required));
      // tslint:disable-next-line:max-line-length
      this.bwqEntityForm.addControl('bwqDispositions' + item.bwqInstructionsID, new FormControl(item.bwqDispositionsID, Validators.required));
    });

    // remove dummy control
    this.bwqEntityForm.removeControl('');

    this.editorialFormsSrv.registerForm(this.bwqEntityForm);


  }

  ngOnDestroy(): void {
    if (this.bwqEntityObjectSubscription) { this.bwqEntityObjectSubscription.unsubscribe(); }
  }

}
