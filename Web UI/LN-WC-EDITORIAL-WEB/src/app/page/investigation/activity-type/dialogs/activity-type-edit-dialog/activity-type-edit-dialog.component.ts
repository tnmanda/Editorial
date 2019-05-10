import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivityType } from 'src/app/shared/models/investigation/activity-type.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { ActivityTypeService } from 'src/app/shared/services/investigation/activity-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-type-edit-dialog',
  templateUrl: './activity-type-edit-dialog.component.html',
  styleUrls: ['./activity-type-edit-dialog.component.css']
})
export class ActivityTypeEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedActivityType: ActivityType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  activityTypeEditSubscription: Subscription;

  activityTypeForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.activityTypeForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private activityTypeSrv: ActivityTypeService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (this.selectedActivityType) {
      this.generateForm();
      this.activityTypeForm.setValue({
          activityTypeName: this.selectedActivityType.activityTypeName,
          activityTypeDescription: this.selectedActivityType.activityTypeDescription,
          isInList: this.selectedActivityType.isInList,
          isActive: this.selectedActivityType.isActive,
      });
    }
  }

  generateForm() {
    this.activityTypeForm = new FormGroup ({
      'activityTypeName' : new FormControl('', Validators.required),
      'activityTypeDescription' : new FormControl('', Validators.required),
      'isInList' : new FormControl(false, Validators.required),
      'isActive' : new FormControl(false, Validators.required)
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const activityType = new ActivityType();
      activityType.activityTypeID = this.selectedActivityType.activityTypeID;
      activityType.activityTypeName = <string>this.activityTypeForm.get('activityTypeName').value;
      activityType.activityTypeDescription = <string>this.activityTypeForm.get('activityTypeDescription').value;
      activityType.isInList = <boolean>this.activityTypeForm.get('isInList').value;
      activityType.isActive = <boolean>this.activityTypeForm.get('isActive').value;
      activityType.createdBy = this.selectedActivityType.createdBy;
      activityType.dateCreatedUTC = this.selectedActivityType.dateCreatedUTC;
      activityType.updatedBy = this.globalHelperSrv.getCurrentUser();
      activityType.lastUpdatedUTC = new Date().toUTCString();

      this.activityTypeSrv.apiUrl = environment.investigation_management.activity_type.root;
      this.activityTypeEditSubscription = this.activityTypeSrv.put(activityType).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Activity type successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.activityTypeForm.reset();
    this.displayChange.emit(false);
    this.selectedActivityType = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.activityTypeEditSubscription) { this.activityTypeEditSubscription.unsubscribe(); }
  }

}
