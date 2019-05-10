import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Disposition } from 'src/app/shared/models/investigation/disposition.model';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { DispositionService } from 'src/app/shared/services/investigation/disposition.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-disposition-edit-dialog',
  templateUrl: './disposition-edit-dialog.component.html',
  styleUrls: ['./disposition-edit-dialog.component.css']
})
export class DispositionEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedDisposition: Disposition;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  dispositionEditSubscription: Subscription;

  dispositionForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.dispositionForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private dispositionSrv: DispositionService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (this.selectedDisposition) {
      this.generateForm();
      this.dispositionForm.setValue({
        dispositionType: this.selectedDisposition.dispositionType,
        dispositionDescription: this.selectedDisposition.dispositionDescription
      });
    }
  }

  generateForm() {
    this.dispositionForm = new FormGroup ({
      'dispositionType' : new FormControl('', Validators.required),
      'dispositionDescription' : new FormControl('', Validators.required)
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const disposition = new Disposition();
      disposition.investigationDispositionsID = this.selectedDisposition.investigationDispositionsID;
      disposition.dispositionType = <string>this.dispositionForm.get('dispositionType').value;
      disposition.dispositionDescription = <string>this.dispositionForm.get('dispositionDescription').value;
      disposition.createdBy = this.selectedDisposition.createdBy;
      disposition.dateCreatedUTC = this.selectedDisposition.dateCreatedUTC;
      disposition.updatedBy = this.globalHelperSrv.getCurrentUser();
      disposition.lastUpdatedUTC = new Date().toUTCString();

      this.dispositionSrv.apiUrl = environment.investigation_management.disposition.root;
      this.dispositionEditSubscription = this.dispositionSrv.put(disposition).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Disposition successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.dispositionForm.reset();
    this.displayChange.emit(false);
    this.selectedDisposition = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.dispositionEditSubscription) { this.dispositionEditSubscription.unsubscribe(); }
  }

}
