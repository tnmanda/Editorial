import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PriorityType } from 'src/app/shared/models/investigation/priority-type.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { PriorityTypeService } from 'src/app/shared/services/investigation/priority-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-priority-type-edit-dialog',
  templateUrl: './priority-type-edit-dialog.component.html',
  styleUrls: ['./priority-type-edit-dialog.component.css']
})
export class PriorityTypeEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedPriorityType: PriorityType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  priorityTypeEditSubscription: Subscription;

  priorityTypeForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.priorityTypeForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private priorityTypeSrv: PriorityTypeService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (this.selectedPriorityType) {
      this.generateForm();
      this.priorityTypeForm.setValue({
          priorityName: this.selectedPriorityType.priorityName,
          priorityDescription: this.selectedPriorityType.priorityDescription,
          priorityWeight: this.selectedPriorityType.priorityWeight,
      });
    }
  }

  generateForm() {
    this.priorityTypeForm = new FormGroup ({
      'priorityName' : new FormControl('', Validators.required),
      'priorityDescription' : new FormControl('', Validators.required),
      'priorityWeight' : new FormControl(false, Validators.required)
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const priorityType = new PriorityType();
      priorityType.priorityTypeID = this.selectedPriorityType.priorityTypeID;
      priorityType.priorityName = <string>this.priorityTypeForm.get('priorityName').value;
      priorityType.priorityDescription = <string>this.priorityTypeForm.get('priorityDescription').value;
      priorityType.priorityWeight = <number>this.priorityTypeForm.get('priorityWeight').value;
      priorityType.createdBy = this.selectedPriorityType.createdBy;
      priorityType.dateCreatedUTC = this.selectedPriorityType.dateCreatedUTC;
      priorityType.updatedBy = this.globalHelperSrv.getCurrentUser();
      priorityType.lastUpdatedUTC = new Date().toUTCString();

      this.priorityTypeSrv.apiUrl = environment.investigation_management.priority_type.root;
      this.priorityTypeEditSubscription = this.priorityTypeSrv.put(priorityType).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Priority type successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.priorityTypeForm.reset();
    this.displayChange.emit(false);
    this.selectedPriorityType = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.priorityTypeEditSubscription) { this.priorityTypeEditSubscription.unsubscribe(); }
  }

}
