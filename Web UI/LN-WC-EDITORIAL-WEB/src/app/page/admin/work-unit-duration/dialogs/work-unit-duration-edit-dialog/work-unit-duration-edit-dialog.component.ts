import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { WorkUnitDuration } from 'src/app/shared/models/admin/work-unit-duration.model';
import { Subscription } from 'rxjs';
import { WorkUnitType } from 'src/app/shared/models/admin/types/work-unit-type.model';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { MessageService } from 'primeng/api';
import { WorkUnitTypeService } from 'src/app/shared/services/admin/types/work-unit-type.service';
import { WorkUnitDurationService } from 'src/app/shared/services/admin/work-unit-duration.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-unit-duration-edit-dialog',
  templateUrl: './work-unit-duration-edit-dialog.component.html',
  styleUrls: ['./work-unit-duration-edit-dialog.component.css']
})
export class WorkUnitDurationEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedWorkUnitDuration: WorkUnitDuration;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  workUnitDurationEditSubscription: Subscription;
  workUnitTypeAllSubscription: Subscription;

  workUnitTypes: WorkUnitType[];

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

  ngOnChanges(): void {
    if (this.selectedWorkUnitDuration) {
      this.generateForm();

      this.workUnitDurationForm.setValue({
          workUnitType: this.selectedWorkUnitDuration.workUnitType,
          durationInMinutes: this.selectedWorkUnitDuration.durationInMinutes,
          isActive: this.selectedWorkUnitDuration.isActive
      });
    }
  }

  generateForm() {
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

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const workUnitDuration = new WorkUnitDuration();
      workUnitDuration.workLockDurationInMinID = this.selectedWorkUnitDuration.workLockDurationInMinID;
      workUnitDuration.workUnitTypeID = <number>this.workUnitDurationForm.get('workUnitType').value.workUnitTypeID;
      workUnitDuration.durationInMinutes = <number>this.workUnitDurationForm.get('durationInMinutes').value;
      workUnitDuration.isActive = <boolean>this.workUnitDurationForm.get('isActive').value;
      workUnitDuration.createdBy = this.selectedWorkUnitDuration.createdBy;
      workUnitDuration.dateCreatedUTC = this.selectedWorkUnitDuration.dateCreatedUTC;
      workUnitDuration.updatedBy = this.globalHelperSrv.getCurrentUser();
      workUnitDuration.lastUpdatedUTC = new Date().toUTCString();

      this.workUnitDurationSrv.apiUrl = environment.workUnitDuration.root;
      this.workUnitDurationEditSubscription = this.workUnitDurationSrv.put(workUnitDuration).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Work unit duration successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.workUnitDurationForm.reset();
    this.displayChange.emit(false);
    this.selectedWorkUnitDuration = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.workUnitDurationEditSubscription) { this.workUnitDurationEditSubscription.unsubscribe(); }
    if (this.workUnitTypeAllSubscription) { this.workUnitTypeAllSubscription.unsubscribe(); }
  }

}
