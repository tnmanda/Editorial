import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PageService } from '../../../../shared/services/admin/page.service';
import { Page } from '../../../../shared/models/admin/page.model';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PageGroupService } from '../../../../shared/services/admin/page-group.service';
import { PageGroup } from '../../../../shared/models/admin/page-group.model';
import { ParentGroupService } from '../../../../shared/services/admin/parent-group.service';

@Component({
  selector: 'app-page-management-list',
  templateUrl: './page-management-list.component.html',
  styleUrls: ['./page-management-list.component.css'],
  providers: [MessageService]
})
export class PageManagementListComponent implements OnInit, OnDestroy {

  public items: MenuItem[];
  home: MenuItem;

  selectedPage: Page;
  selectedPageGroup: PageGroup;

  pageAllSubscription: Subscription;
  pageOneSubscription: Subscription;
  pageGroupAllSubscription: Subscription;
  pageGroupOneSubscription: Subscription;

  pages: Page[];
  pageGroups: PageGroup[];

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  displayGroupAddDialog = false;
  displayGroupEditDialog = false;
  displayGroupDeleteDialog = false;

  constructor(private pageSrv: PageService,
              private pageGroupSrv: PageGroupService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Page Management', url: 'page-management'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getPages();
    this.getPageGroups();
  }

  getPages() {
    this.pageSrv.apiUrl = environment.page_management.page.root;
    this.pageAllSubscription = this.pageSrv.getAll().subscribe((items: Array<Page>) => {
        items.forEach(async item => {
          if (item.pagesGroupsID !== null) {
            const pageGroup = await this.pageGroupSrv.getSingle(item.pagesGroupsID.toString()).toPromise();
            item.pagesGroupsName = pageGroup.pagesGroupsName;
          }
        });
        this.pages = items;
    });
  }

  getPageByID(pagesID: number) {
    this.pageSrv.apiUrl = environment.page_management.page.root;
    this.pageOneSubscription = this.pageSrv.getSingle(pagesID.toString()).subscribe((item: Page) => {
      this.selectedPage = item;
    });
  }

  getPageGroups() {
    this.pageGroupSrv.apiUrl = environment.page_management.page_group.root;
    this.pageGroupAllSubscription = this.pageGroupSrv.getAll().subscribe((items: Array<PageGroup>) => {

      this.pageGroups = items;
    });
  }

  getPageGroupByID(pageGroupID: number) {
    this.pageGroupSrv.apiUrl = environment.page_management.page_group.root;
    this.pageGroupOneSubscription = this.pageGroupSrv.getSingle(pageGroupID.toString()).subscribe((item: PageGroup) => {
      this.selectedPageGroup = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getPages();
  }

  showEditDialog(pagesID) {
    this.getPageByID(pagesID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getPages();
  }

  showDeleteDialog(pagesID) {
    this.getPageByID(pagesID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getPages();
  }

  showGroupAddDialog() {
    this.displayGroupAddDialog = true;
  }

  onGroupAddDialogClose(event) {
    this.displayGroupAddDialog = event;
    this.getPageGroups();
  }

  showGroupEditDialog(pageGroupID) {
    this.getPageGroupByID(pageGroupID);
    this.displayGroupEditDialog = true;
  }

  onGroupEditDialogClose(event) {
    this.displayGroupEditDialog = event;
    this.getPageGroups();
  }

  showGroupDeleteDialog(pageGroupID) {
    this.getPageGroupByID(pageGroupID);
    this.displayGroupDeleteDialog = true;
  }

  onGroupDeleteDialogClose(event) {
    this.displayGroupDeleteDialog = event;
    this.getPageGroups();
  }

  ngOnDestroy(): void {
   if (this.pageAllSubscription) { this.pageAllSubscription.unsubscribe(); }
   if (this.pageOneSubscription) { this.pageOneSubscription.unsubscribe(); }
   if (this.pageGroupAllSubscription) { this.pageGroupAllSubscription.unsubscribe(); }
   if (this.pageGroupOneSubscription) { this.pageGroupOneSubscription.unsubscribe(); }
  }

}
