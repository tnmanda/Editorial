import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Page } from '../../../../../shared/models/admin/page.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { PageService } from '../../../../../shared/services/admin/page.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageGroupService } from '../../../../../shared/services/admin/page-group.service';
import { PageGroup } from '../../../../../shared/models/admin/page-group.model';

@Component({
  selector: 'app-page-add-dialog',
  templateUrl: './page-add-dialog.component.html',
  styleUrls: ['./page-add-dialog.component.css'],
  providers: [MessageService]
})
export class PageAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  page: Page;
  pageGroups: PageGroup[];

  pageAddSubscription: Subscription;
  pageGroupAllSubscription: Subscription;

  isSubmitted = false;

  pageForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.pageForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private pageSrv: PageService,
              private pageGroupSrv: PageGroupService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getPageGroups();
  }

  ngOnChanges() {
    this.pageForm = new FormGroup ({
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

  onSave(pageForm) {
    this.isSubmitted = true;

    if (pageForm.valid) {
      this.page = pageForm.value;
      this.page.pagesGroupsID = this.page.pagesGroups.pagesGroupsID;
      this.page.createdBy = this.globalHelperSrv.getCurrentUser();
      this.page.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.page.dateCreatedUTC = new Date().toUTCString();
      this.page.lastUpdatedUTC = new Date().toUTCString();
      this.page.pagesGroups = null;
      this.pageSrv.apiUrl = environment.page_management.page.root;
      this.pageAddSubscription = this.pageSrv.post(this.page).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.page.pageName + ' successfully created.' });

      this.page = new Page();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
  this.displayChange.emit(false);
  this.pageForm.reset();
  this.isSubmitted = false;
  this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.pageAddSubscription) { this.pageAddSubscription.unsubscribe(); }
    if (this.pageGroupAllSubscription) { this.pageGroupAllSubscription.unsubscribe(); }
  }

}
