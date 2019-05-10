import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PageGroup } from '../../../../../shared/models/admin/page-group.model';
import { Subscription } from 'rxjs';
import { ParentGroup } from '../../../../../shared/models/admin/parent-group.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { PageGroupService } from '../../../../../shared/services/admin/page-group.service';
import { MessageService } from 'primeng/api';
import { ParentGroupService } from '../../../../../shared/services/admin/parent-group.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-page-group-add-dialog',
  templateUrl: './page-group-add-dialog.component.html',
  styleUrls: ['./page-group-add-dialog.component.css']
})
export class PageGroupAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  pageGroup: PageGroup;
  pageGroupAllSubscription: Subscription;

  isSubmitted = false;

  pageGroupForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.pageGroupForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private pageGroupSrv: PageGroupService,
              private messageService: MessageService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.pageGroupForm = new FormGroup ({
      'pagesGroupsName' : new FormControl('', Validators.required),
      'pagesGroupsDescription' : new FormControl('', Validators.required),
      'sortOrder' : new FormControl('', Validators.required)
    });
  }

  onSave(pageGroupForm) {
    this.isSubmitted = true;
    console.log(pageGroupForm);
    if (pageGroupForm.valid) {
      this.pageGroup = pageGroupForm.value;
      this.pageGroup.parentGroupID = 0;
      this.pageGroup.createdBy = this.globalHelperSrv.getCurrentUser();
      this.pageGroup.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.pageGroup.dateCreatedUTC = new Date().toUTCString();
      this.pageGroup.lastUpdatedUTC = new Date().toUTCString();
      this.pageGroup.parentGroup = null;

      this.pageGroupSrv.apiUrl = environment.page_management.page_group.root;
      this.pageGroupAllSubscription = this.pageGroupSrv.post(this.pageGroup).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.pageGroup.pagesGroupsName + ' successfully created.' });

      this.pageGroup = new PageGroup();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
  this.displayChange.emit(false);
  this.pageGroupForm.reset();
  this.isSubmitted = false;
  this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.pageGroupAllSubscription) { this.pageGroupAllSubscription.unsubscribe(); }
  }

}
