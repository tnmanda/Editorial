import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { ActivityTypeService } from 'src/app/shared/services/investigation/activity-type.service';
import { MessageService } from 'primeng/api';
import { ActivityType } from 'src/app/shared/models/investigation/activity-type.model';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-type-add-dialog',
  templateUrl: './activity-type-add-dialog.component.html',
  styleUrls: ['./activity-type-add-dialog.component.css']
})
export class ActivityTypeAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  activityType: ActivityType;
  activityTypeAddSubscription: Subscription;

  isSubmitted = false;

  activityTypeForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.activityTypeForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private activityTypeSrv: ActivityTypeService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.activityTypeForm = new FormGroup ({
      'activityTypeName' : new FormControl('', Validators.required),
      'activityTypeDescription' : new FormControl('', Validators.required),
      'isInList' : new FormControl(false, Validators.required),
      'isActive' : new FormControl(false, Validators.required)
    });
  }

  onSave(activityTypeForm) {
    this.isSubmitted = true;

    if (activityTypeForm.valid) {
      this.activityType = activityTypeForm.value;
      this.activityType.createdBy = this.globalHelperSrv.getCurrentUser();
      this.activityType.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.activityType.dateCreatedUTC = new Date().toUTCString();
      this.activityType.lastUpdatedUTC = new Date().toUTCString();
      this.activityTypeSrv.apiUrl = environment.investigation_management.activity_type.root;
      this.activityTypeAddSubscription = this.activityTypeSrv.post(this.activityType).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'Activity type successfully created.' });

        this.activityType = new ActivityType();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.activityTypeForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.activityTypeAddSubscription) { this.activityTypeAddSubscription.unsubscribe(); }
  }

}
