import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Status } from 'src/app/shared/models/investigation/status.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { StatusService } from 'src/app/shared/services/investigation/status.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-status-edit-dialog',
  templateUrl: './status-edit-dialog.component.html',
  styleUrls: ['./status-edit-dialog.component.css']
})
export class StatusEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedStatus: Status;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  statusEditSubscription: Subscription;

  statusForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.statusForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private statusSrv: StatusService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (this.selectedStatus) {
      this.generateForm();
      this.statusForm.setValue({
          investigationStatusName: this.selectedStatus.investigationStatusName,
          investigationStatusDescription: this.selectedStatus.investigationStatusDescription,
          isDefault: this.selectedStatus.isDefault,
      });
    }
  }

  generateForm() {
    this.statusForm = new FormGroup ({
      'investigationStatusName' : new FormControl('', Validators.required),
      'investigationStatusDescription' : new FormControl('', Validators.required),
      'isDefault' : new FormControl(false, Validators.required)
    });
  }


  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const status = new Status();
      status.investigationStatusID = this.selectedStatus.investigationStatusID;
      status.investigationStatusName = <string>this.statusForm.get('investigationStatusName').value;
      status.investigationStatusDescription = <string>this.statusForm.get('investigationStatusDescription').value;
      status.isDefault = <boolean>this.statusForm.get('isDefault').value;
      status.createdBy = this.selectedStatus.createdBy;
      status.dateCreatedUTC = this.selectedStatus.dateCreatedUTC;
      status.updatedBy = this.globalHelperSrv.getCurrentUser();
      status.lastUpdatedUTC = new Date().toUTCString();

      this.statusSrv.apiUrl = environment.investigation_management.status.root;
      this.statusEditSubscription = this.statusSrv.put(status).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Status successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.statusForm.reset();
    this.displayChange.emit(false);
    this.selectedStatus = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }


  ngOnDestroy(): void {
    if (this.statusEditSubscription) { this.statusEditSubscription.unsubscribe(); }
  }

}
