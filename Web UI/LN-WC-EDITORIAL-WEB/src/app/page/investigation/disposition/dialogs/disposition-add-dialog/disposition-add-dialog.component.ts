import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Disposition } from 'src/app/shared/models/investigation/disposition.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { DispositionService } from 'src/app/shared/services/investigation/disposition.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-disposition-add-dialog',
  templateUrl: './disposition-add-dialog.component.html',
  styleUrls: ['./disposition-add-dialog.component.css']
})
export class DispositionAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  disposition: Disposition;
  dispositionAddSubscription: Subscription;

  isSubmitted = false;

  dispositionForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.dispositionForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private dispositionSrv: DispositionService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.dispositionForm = new FormGroup ({
      'dispositionType' : new FormControl('', Validators.required),
      'dispositionDescription' : new FormControl('', Validators.required),
    });
  }

  onSave(dispositionForm) {
    this.isSubmitted = true;

    if (dispositionForm.valid) {
      this.disposition = dispositionForm.value;
      this.disposition.createdBy = this.globalHelperSrv.getCurrentUser();
      this.disposition.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.disposition.dateCreatedUTC = new Date().toUTCString();
      this.disposition.lastUpdatedUTC = new Date().toUTCString();
      this.dispositionSrv.apiUrl = environment.investigation_management.disposition.root;
      this.dispositionAddSubscription = this.dispositionSrv.post(this.disposition).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'Disposition successfully created.' });

        this.disposition = new Disposition();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.dispositionForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.dispositionAddSubscription) { this.dispositionAddSubscription.unsubscribe(); }
  }

}
