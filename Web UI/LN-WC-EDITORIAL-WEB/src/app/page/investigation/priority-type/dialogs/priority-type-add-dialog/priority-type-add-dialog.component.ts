import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PriorityType } from 'src/app/shared/models/investigation/priority-type.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { PriorityTypeService } from 'src/app/shared/services/investigation/priority-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-priority-type-add-dialog',
  templateUrl: './priority-type-add-dialog.component.html',
  styleUrls: ['./priority-type-add-dialog.component.css']
})
export class PriorityTypeAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  priorityType: PriorityType;
  priorityTypeAddSubscription: Subscription;

  isSubmitted = false;

  priorityTypeForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.priorityTypeForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private priorityTypeSrv: PriorityTypeService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.priorityTypeForm = new FormGroup ({
      'priorityName' : new FormControl('', Validators.required),
      'priorityDescription' : new FormControl('', Validators.required),
      'priorityWeight' : new FormControl('', Validators.required),
    });
  }

  onSave(priorityTypeForm) {
    this.isSubmitted = true;

    if (priorityTypeForm.valid) {
      this.priorityType = priorityTypeForm.value;
      this.priorityType.createdBy = this.globalHelperSrv.getCurrentUser();
      this.priorityType.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.priorityType.dateCreatedUTC = new Date().toUTCString();
      this.priorityType.lastUpdatedUTC = new Date().toUTCString();
      this.priorityTypeSrv.apiUrl = environment.investigation_management.priority_type.root;
      this.priorityTypeAddSubscription = this.priorityTypeSrv.post(this.priorityType).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'Priority type successfully created.' });

        this.priorityType = new PriorityType();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.priorityTypeForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.priorityTypeAddSubscription) { this.priorityTypeAddSubscription.unsubscribe(); }
  }

}
