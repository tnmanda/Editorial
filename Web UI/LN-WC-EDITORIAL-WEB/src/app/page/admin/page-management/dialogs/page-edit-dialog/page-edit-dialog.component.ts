import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Page } from '../../../../../shared/models/admin/page.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { PageService } from '../../../../../shared/services/admin/page.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';
import { PageGroup } from '../../../../../shared/models/admin/page-group.model';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { PageGroupService } from '../../../../../shared/services/admin/page-group.service';

@Component({
  selector: 'app-page-edit-dialog',
  templateUrl: './page-edit-dialog.component.html',
  styleUrls: ['./page-edit-dialog.component.css']
})
export class PageEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedPage: Page;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  pageGroups: PageGroup[];

  pageEditSubscription: Subscription;
  pageGroupAllSubscription: Subscription;

  isSubmitted = false;

  pageForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.pageForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private formBuilder: FormBuilder,
              private pageSrv: PageService,
              private pageGroupSrv: PageGroupService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getPageGroups();
  }

  ngOnChanges(): void {
    if (this.selectedPage) {
      this.generateForm();
      this.pageForm.setValue({
          pageName: this.selectedPage.pageName,
          pagesDescription: this.selectedPage.pagesDescription,
          fullPath: this.selectedPage.fullPath,
          pagesGroups: this.selectedPage.pagesGroups,
          isActive: this.selectedPage.isActive

      });
    }
  }

  generateForm() {
    this.pageForm = new FormGroup ( {
      'pageName' : new FormControl('', Validators.required),
      'pagesDescription' : new FormControl('', Validators.required),
      'fullPath' : new FormControl('', Validators.required),
      'pagesGroups' : new FormControl('', Validators.required),
      'isActive' : new FormControl(false, Validators.required)
    });
  }

  getPageGroups() {
    this.pageGroupSrv.apiUrl = environment.page_management.page_group.root;
    this.pageGroupAllSubscription = this.pageGroupSrv.getAll().subscribe((items: Array<PageGroup>) => {
        this.pageGroups = items;
    });
  }


  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const page = new Page();
      page.pagesID = this.selectedPage.pagesID;
      page.pageName = <string>this.pageForm.get('pageName').value;
      page.pagesDescription = <string>this.pageForm.get('pagesDescription').value;
      page.fullPath = <string>this.pageForm.get('fullPath').value;
      page.pagesGroupsID = <number>this.pageForm.get('pagesGroups').value.pagesGroupsID;
      page.isActive = <boolean>this.pageForm.get('isActive').value;
      page.createdBy = this.selectedPage.createdBy;
      page.dateCreatedUTC = this.selectedPage.dateCreatedUTC;
      page.updatedBy = this.globalHelperSrv.getCurrentUser();
      page.lastUpdatedUTC = new Date().toUTCString();

      this.pageSrv.apiUrl = environment.page_management.page.root;
      this.pageEditSubscription = this.pageSrv.put(page).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.selectedPage.pageName + ' successfully updated.' });

      formDirective.reset();
      this.onClose();
      }, error => { this.errorMessage = error; });
    }

  }

  onClose() {
    this.pageForm.reset();
    this.displayChange.emit(false);
    this.selectedPage = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.pageEditSubscription) { this.pageEditSubscription.unsubscribe(); }
    if (this.pageGroupAllSubscription) { this.pageGroupAllSubscription.unsubscribe(); }
  }


}
