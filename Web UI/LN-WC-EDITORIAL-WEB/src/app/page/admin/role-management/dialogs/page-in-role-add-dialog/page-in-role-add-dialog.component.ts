import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { PageInUserRole } from '../../../../../shared/models/admin/page-in-user-role.model';
import { Subscription } from 'rxjs';
import { PageService } from '../../../../../shared/services/admin/page.service';
import { PageInUserRoleService } from '../../../../../shared/services/admin/page-in-user-role.service';
import { environment } from '../../../../../../environments/environment';
import { Page } from '../../../../../shared/models/admin/page.model';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { RoleType } from '../../../../../shared/models/admin/types/role-type.model';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-in-role-add-dialog',
  templateUrl: './page-in-role-add-dialog.component.html',
  styleUrls: ['./page-in-role-add-dialog.component.css']
})
export class PageInRoleAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedRoleType: RoleType;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  pageInUserRole: PageInUserRole;

  pageInUserRoleAddSubscription: Subscription;
  pageAllSubscription: Subscription;

  pages: Page[];

  pageInUserRoleForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.pageInUserRoleForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private pageSrv: PageService,
              private pageInUserRoleSrv: PageInUserRoleService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getPages();
  }

  ngOnChanges() {
    this.pageInUserRoleForm = new FormGroup ({
      'page' : new FormControl('', Validators.required),
    });
  }

  getPages() {
    this.pageSrv.apiUrl = environment.page_management.page.root;
    this.pageAllSubscription = this.pageSrv.getAll().subscribe((items: Array<Page>) => {
       this.pages = items;
    });
  }

  onSave(pageInUserRoleForm) {
    this.isSubmitted = true;

    if (pageInUserRoleForm.valid) {
      this.pageInUserRole = this.pageInUserRoleForm.value;
      console.log(this.pageInUserRole);
      this.pageInUserRole.pagesID = this.pageInUserRole.page.pagesID;
      this.pageInUserRole.roleTypeID = this.selectedRoleType.roleTypeID;
      this.pageInUserRole.createdBy = this.globalHelperSrv.getCurrentUser();
      this.pageInUserRole.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.pageInUserRole.dateCreatedUTC = new Date().toUTCString();
      this.pageInUserRole.lastUpdatedUTC = new Date().toUTCString();
      this.pageInUserRole.page = null;

      this.pageInUserRoleSrv.apiUrl = environment.page_in_user_role.root;
      this.pageInUserRoleAddSubscription = this.pageInUserRoleSrv.post(this.pageInUserRole).subscribe(result => {
        this.onClose();
        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'Page successfully added.' });
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.displayChange.emit(false);
    this.pageInUserRoleForm.reset();
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.pageAllSubscription) { this.pageAllSubscription.unsubscribe(); }
    if (this.pageInUserRoleAddSubscription) { this.pageInUserRoleAddSubscription.unsubscribe(); }
  }

}
