import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, TreeNode, MessageService } from 'primeng/api';
import { InvestigationEntityNav } from 'src/app/shared/models/investigation/investigation-entity-nav.model';
import { InvestigationService } from 'src/app/shared/services/investigation/investigation.service';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { InvestigationEntity, InvEntityHRToken, InvEntityObject } from 'src/app/shared/models/investigation/investigation-entity.model';

@Component({
  selector: 'app-investigation-entity-management',
  templateUrl: './investigation-entity-management.component.html',
  styleUrls: ['./investigation-entity-management.component.css'],
  providers: [MessageService]
})
export class InvestigationEntityManagementComponent implements OnInit, OnDestroy {

  public items: MenuItem[];
  home: MenuItem;

  investigationEntityNavs: InvestigationEntityNav[];

  investigationEntityTree: TreeNode[];
  selectedNode: TreeNode;

  isTreeLoading: boolean;
  isLoading: boolean;

  thisInterVal: any;
  thisEvent: any;

  investigationNavSubscription: Subscription;
  invEntityAllSubscription: Subscription;
  invEntityObjectSubscription: Subscription;

  investigationEntities: InvestigationEntity[];


  constructor(public globalHelperSrv: GlobalHelperService,
              private investigationSrv: InvestigationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {label: 'Investigation'},
      {label: 'Home', url: 'investigation-entity-management'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};
    this.getNavs();
  }

  getNavs() {
    this.isTreeLoading = true;
    const userId = Number.parseInt(this.globalHelperSrv.getCurrentUserID());
    this.investigationSrv.apiUrl = environment.investigation_management.investigation.nav;
    this.investigationNavSubscription = this.investigationSrv.getNavs(userId).subscribe((items: Array<InvestigationEntityNav>) => {
      this.investigationEntityNavs = items;
      this.investigationEntityTree = this.investigationEntityNavs;

      this.isTreeLoading = false;
      // this.testJson();
    });
  }

  onEdit(invEntity: InvestigationEntity) {
    const  invEnitityObj = new InvEntityHRToken();
    invEnitityObj.Token = this.globalHelperSrv.getHRToken();
    invEnitityObj.ModuleTableEntryID = invEntity.investigationID;
    invEnitityObj.ProfileId = 0;
    console.log(invEnitityObj);
    this.investigationSrv.apiUrl = environment.investigation_management.investigation.entity;
    this.invEntityObjectSubscription = this.investigationSrv.getBwqEntityObject(invEnitityObj).subscribe((item: InvEntityObject) => {

      if (item.workItemGuid) {
        // this.onEntityLock(bwqEntity.bwqEntitiesId);
        const redirectURL = environment.hr_web + environment.inv_work_item_route + item.workItemGuid;
        const popup = window.open(redirectURL, '_blank');

        const apiToken = localStorage.getItem(environment.api_token);

        this.thisInterVal = setInterval(function() {
          if (apiToken) {
            popup.postMessage(apiToken, environment.hr_web);
          }
        }, 1000);

        setTimeout(() => {
        clearInterval(this.thisInterVal);
        }, 1000);

        // listen to holla back
        window.addEventListener('message', this.eventMessage.bind(this), true);

      } else {
           // Post Message
           this.messageService.add({severity: 'error', summary: 'Error Message',
           detail: item.message });
      }
    });
  }

  eventMessage(event) {
    // this.onRefreshEntityList();
    // this.onRefreshTree();
  }

  nodeSelect(event) {
    if (event.node.children === undefined) {
      this.isLoading = true;
      this.investigationEntities = null;
      this.selectedNode = event.node;
      console.log(event.node.data);
      this.investigationSrv.apiUrl = environment.investigation_management.investigation.filter;
      this.invEntityAllSubscription = this.investigationSrv.getInvestigationEntities(event.node.data)
      .subscribe((items: Array<InvestigationEntity>) => {
        this.investigationEntities = items;
        console.log(this.investigationEntities);
        this.isLoading = false;
      }, (error: Error) => { console.log(error);  this.isLoading = false; });
    }
  }

  expandAll() {
    this.investigationEntityTree.forEach( node => {
          this.expandRecursive(node, true);
      } );
  }

  collapseAll() {
      this.investigationEntityTree.forEach( node => {
          this.expandRecursive(node, false);
      } );
  }

  expandRecursive(node: TreeNode, isExpand: boolean) {
      node.expanded = isExpand;
      if (node.children) {
          node.children.forEach( childNode => {
              this.expandRecursive(childNode, isExpand);
          } );
      }
  }

  ngOnDestroy(): void {
    if (this.investigationNavSubscription) { this.investigationNavSubscription.unsubscribe(); }
    if (this.invEntityAllSubscription) { this.invEntityAllSubscription.unsubscribe(); }
    if (this.invEntityObjectSubscription) { this.invEntityObjectSubscription.unsubscribe(); }
  }

}
