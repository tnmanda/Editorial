import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { PageGroup } from '../../../../../shared/models/admin/page-group.model';
import { Subscription } from 'rxjs';
import { ParentGroup } from '../../../../../shared/models/admin/parent-group.model';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ParentGroupService } from '../../../../../shared/services/admin/parent-group.service';
import { PageGroupService } from '../../../../../shared/services/admin/page-group.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-page-group-edit-dialog',
  templateUrl: './page-group-edit-dialog.component.html',
  styleUrls: ['./page-group-edit-dialog.component.css']
})
export class PageGroupEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedPageGroup: PageGroup;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  pageGroupEditSubscription: Subscription;

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

  ngOnChanges(): void {
    if (this.selectedPageGroup) {
      this.generateForm();
      this.pageGroupForm.setValue({
          pagesGroupsName: this.selectedPageGroup.pagesGroupsName,
          pagesGroupsDescription: this.selectedPageGroup.pagesGroupsDescription,
          sortOrder: this.selectedPageGroup.sortOrder
      });
    }
  }

  generateForm() {
    this.pageGroupForm = new FormGroup ({
      'pagesGroupsName' : new FormControl('', Validators.required),
      'pagesGroupsDescription' : new FormControl('', Validators.required),
      'sortOrder' : new FormControl('', Validators.required)
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const pageGroup = new PageGroup();
      pageGroup.pagesGroupsID = this.selectedPageGroup.pagesGroupsID;
      pageGroup.pagesGroupsName = <string>this.pageGroupForm.get('pagesGroupsName').value;
      pageGroup.pagesGroupsDescription = <string>this.pageGroupForm.get('pagesGroupsDescription').value;
      pageGroup.sortOrder = <number>this.pageGroupForm.get('sortOrder').value;
      pageGroup.parentGroupID = 0;
      pageGroup.createdBy = this.selectedPageGroup.createdBy;
      pageGroup.dateCreatedUTC = this.selectedPageGroup.dateCreatedUTC;
      pageGroup.updatedBy = this.globalHelperSrv.getCurrentUser();
      pageGroup.lastUpdatedUTC = new Date().toUTCString();
      pageGroup.parentGroup = null;
      console.log(pageGroup);
      this.pageGroupSrv.apiUrl = environment.page_management.page_group.root;
      this.pageGroupEditSubscription = this.pageGroupSrv.put(pageGroup).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.selectedPageGroup.pagesGroupsName + ' successfully updated.' });

      formDirective.reset();
      this.onClose();
      }, error => { this.errorMessage = error; });
    }

  }

  onClose() {
    this.pageGroupForm.reset();
    this.displayChange.emit(false);
    this.selectedPageGroup = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.pageGroupEditSubscription) { this.pageGroupEditSubscription.unsubscribe(); }
  }

}
