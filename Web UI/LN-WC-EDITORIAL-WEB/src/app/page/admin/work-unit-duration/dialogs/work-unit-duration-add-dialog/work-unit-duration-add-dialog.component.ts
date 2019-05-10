import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkUnitType } from 'src/app/shared/models/admin/types/work-unit-type.model';
import { Subscription } from 'rxjs';
import { WorkUnitDuration } from 'src/app/shared/models/admin/work-unit-duration.model';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { WorkUnitDurationService } from 'src/app/shared/services/admin/work-unit-duration.service';
import { WorkUnitTypeService } from 'src/app/shared/services/admin/types/work-unit-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-unit-duration-add-dialog',
  templateUrl: './work-unit-duration-add-dialog.component.html',
  styleUrls: ['./work-unit-duration-add-dialog.component.css']
})
export class WorkUnitDurationAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  workUnitDuration: WorkUnitDuration;
  workUnitTypes: WorkUnitType[];

  workUnitDurationAddSubscription: Subscription;
  workUnitTypeAllSubscription: Subscription;

  workUnitDurationForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.workUnitDurationForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private workUnitDurationSrv: WorkUnitDurationService,
              private workUnitType: WorkUnitTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getWorkUnitType();
  }

  ngOnChanges() {
    this.workUnitDurationForm = new FormGroup ({
      'workUnitType' : new FormControl('', Validators.required),
      'durationInMinutes' : new FormControl('', Validators.required),
      'isActive' : new FormControl(false, Validators.required)
    });
  }

  getWorkUnitType() {
    this.workUnitType.apiUrl = environment.workUnitType.root;
    this.workUnitTypeAllSubscription = this.workUnitType.getAll().subscribe((items: Array<WorkUnitType>) => {
      this.workUnitTypes = items;
    });
  }

  onSave(workUnitDurationForm) {
    this.isSubmitted = true;

    if (workUnitDurationForm.valid) {
      this.workUnitDuration = workUnitDurationForm.value;
      this.workUnitDuration.workUnitTypeID = this.workUnitDuration.workUnitType.workUnitTypeID;
      this.workUnitDuration.createdBy = this.globalHelperSrv.getCurrentUser();
      this.workUnitDuration.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.workUnitDuration.dateCreatedUTC = new Date().toUTCString();
      this.workUnitDuration.lastUpdatedUTC = new Date().toUTCString();
      this.workUnitDuration.workUnitType = null;

      this.workUnitDurationSrv.apiUrl = environment.workUnitDuration.root;
      this.workUnitDurationAddSubscription = this.workUnitDurationSrv.post(this.workUnitDuration).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'Work unit duration successfully created.' });

        this.workUnitDuration = new WorkUnitDuration();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.workUnitDurationForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.workUnitDurationAddSubscription) { this.workUnitDurationAddSubscription.unsubscribe(); }
    if (this.workUnitTypeAllSubscription) { this.workUnitTypeAllSubscription.unsubscribe(); }
  }

}
