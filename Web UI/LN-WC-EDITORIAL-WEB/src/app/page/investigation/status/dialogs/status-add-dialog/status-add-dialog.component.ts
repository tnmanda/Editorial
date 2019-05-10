import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { Status } from 'src/app/shared/models/investigation/status.model';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { StatusService } from 'src/app/shared/services/investigation/status.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-status-add-dialog',
  templateUrl: './status-add-dialog.component.html',
  styleUrls: ['./status-add-dialog.component.css']
})
export class StatusAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  status: Status;
  statusAddSubscription: Subscription;

  isSubmitted = false;

  statusForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.statusForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private statusSrv: StatusService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.statusForm = new FormGroup ({
      'investigationStatusName' : new FormControl('', Validators.required),
      'investigationStatusDescription' : new FormControl('', Validators.required),
      'isDefault' : new FormControl(false, Validators.required),
    });
  }

  onSave(statusForm) {
    this.isSubmitted = true;

    if (statusForm.valid) {
      this.status = statusForm.value;
      this.status.createdBy = this.globalHelperSrv.getCurrentUser();
      this.status.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.status.dateCreatedUTC = new Date().toUTCString();
      this.status.lastUpdatedUTC = new Date().toUTCString();
      this.statusSrv.apiUrl = environment.investigation_management.status.root;
      this.statusAddSubscription = this.statusSrv.post(this.status).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'Status successfully created.' });

        this.status = new Status();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.statusForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.statusAddSubscription) { this.statusAddSubscription.unsubscribe(); }
  }

}
