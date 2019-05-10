import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {TreeNode} from 'primeng/api';
import { RecordLock } from 'src/app/shared/models/bwq/record-lock.model';
import { BwqEntityNav } from 'src/app/shared/models/bwq/bwq-entity-nav.model';
import { BwqEntity, BwqEntityHRToken, BwqEntityObject } from 'src/app/shared/models/bwq/bwq-entity.model';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { BwqService } from 'src/app/shared/services/bwq/bwq.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bwq-entity-management',
  templateUrl: './bwq-entity-management.component.html',
  styleUrls: ['./bwq-entity-management.component.css'],
  providers: [MessageService]
})
export class BwqEntityManagementComponent implements OnInit, OnDestroy {

  public items: MenuItem[];
  home: MenuItem;

  bwqNavSubscription: Subscription;
  bwqEntitySubscription: Subscription;
  bwqRecordLockSubscription: Subscription;

  bwqEntityNavs: BwqEntityNav[];

  bwqEntityTree: TreeNode[];
  selectedNode: TreeNode;
  selectedBWQEntitiesID: number;

  bwqEntities: BwqEntity[];

  isTreeLoading: boolean;
  isLoading: boolean;

  thisInterVal: any;
  thisEvent: any;

  parentNode: string[];

  constructor(public globalHelperSrv: GlobalHelperService,
              private bwqSrv: BwqService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {label: 'BWQ'},
      {label: 'Home', url: 'bwq-entity-management'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};
    this.getNavs();

    this.parentNode = [];
  }

  getNavs() {
    this.isTreeLoading = true;
    const userId = Number.parseInt(this.globalHelperSrv.getCurrentUserID());
    this.bwqSrv.apiUrl = environment.bwq_management.bwq.nav;
    this.bwqNavSubscription = this.bwqSrv.getNavs(userId).subscribe((items: Array<BwqEntityNav>) => {
      this.bwqEntityNavs = items;
      this.bwqEntityTree = this.bwqEntityNavs;

      this.isTreeLoading = false;
    });
  }

  onEdit(bwqEntity: BwqEntity) {

    const  bwqEnitityObj = new BwqEntityHRToken();
    bwqEnitityObj.token = this.globalHelperSrv.getHRToken();
    bwqEnitityObj.ModuleTableEntryID = bwqEntity.bwqEntitiesId;
    bwqEnitityObj.ProfileId = bwqEntity.mmmEntityId;

    this.bwqSrv.apiUrl = environment.bwq_management.bwq.entity;
    this.bwqEntitySubscription = this.bwqSrv.getBwqEntityObject(bwqEnitityObj).subscribe((item: BwqEntityObject) => {

      if (item.workItemGuid) {
        this.selectedBWQEntitiesID = bwqEntity.bwqEntitiesId;
        this.onEntityLock(bwqEntity.bwqEntitiesId);
        const redirectURL = environment.hr_web + environment.bwq_work_item_route + item.workItemGuid;
        const popup = window.open(redirectURL, '_blank');

        const apiToken = localStorage.getItem(environment.api_token);

        this.thisInterVal = setInterval(function() {
          popup.postMessage(apiToken, environment.hr_web);

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
    this.onEntityUnlock(this.selectedBWQEntitiesID);
    this.onRefreshEntityList();
    this.onRefreshTree();
  }

  onEntityLock(BWQEntitiesID) {
    const recordLock = new RecordLock();
    recordLock.workUnitTypeID = 6;
    recordLock.appUserID = this.globalHelperSrv.getCurrentUserID();
    recordLock.idFromWorkUnitsDBTable = BWQEntitiesID;

    this.bwqSrv.apiUrl = environment.bwq_management.record_lock.root;
    this.bwqRecordLockSubscription = this.bwqSrv.postLockEntity(recordLock).subscribe(result => {

      this.onRefreshEntityList();
    });
  }

  onEntityUnlock(BWQEntitiesID) {
    const recordLock = new RecordLock();
    recordLock.workUnitTypeID = 6;
    recordLock.appUserID = this.globalHelperSrv.getCurrentUserID();
    recordLock.idFromWorkUnitsDBTable = BWQEntitiesID;

    this.bwqSrv.apiUrl = environment.bwq_management.record_lock.root;
    this.bwqRecordLockSubscription = this.bwqSrv.deleteUnlockEntity(recordLock).subscribe(result => {
      this.selectedBWQEntitiesID = null;
      this.onRefreshEntityList();
    });

  }

  onRefreshTree() {
    this.isTreeLoading = true;
    const userId = Number.parseInt(this.globalHelperSrv.getCurrentUserID());
    this.bwqSrv.apiUrl = environment.bwq_management.bwq.nav;
    this.bwqNavSubscription = this.bwqSrv.getNavs(userId).subscribe((items: Array<BwqEntityNav>) => {
      this.bwqEntityNavs = items;
      this.bwqEntityTree = this.bwqEntityNavs;
      this.getNodeParentRecursive(this.selectedNode);
      this.expandParent();
      this.isTreeLoading = false;
    });
  }


  onRefreshEntityList() {
    if (this.selectedNode !== null) {
      this.bwqSrv.apiUrl = environment.bwq_management.bwq.filter;
      this.bwqEntitySubscription = this.bwqSrv.getBwqEntities(this.selectedNode.data).subscribe((items: Array<BwqEntity>) => {
        this.bwqEntities = items;
        this.isLoading = false;
      }, (error: Error) => {  this.isLoading = false; });
    }
  }


  nodeSelect(event) {
    // event.node = selected node
    if (event.node.children === undefined) {
      this.isLoading = true;
      this.bwqEntities = null;
      this.selectedNode = event.node;

      this.bwqSrv.apiUrl = environment.bwq_management.bwq.filter;
      this.bwqEntitySubscription = this.bwqSrv.getBwqEntities(event.node.data).subscribe((items: Array<BwqEntity>) => {
        this.bwqEntities = items;
        this.isLoading = false;
      }, (error: Error) => { console.log(error);  this.isLoading = false; });
    }
  }

  expandAll() {
    this.bwqEntityTree.forEach( node => {
          this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.bwqEntityTree.forEach( node => {
        this.expandRecursive(node, false);
    });
  }

  getNodeParentRecursive(node: TreeNode) {
    if (node.parent) {
      this.parentNode.push(node.parent.label);
      this.getNodeParentRecursive(node.parent);
    }
  }

  expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
        node.children.forEach( childNode => {
          this.expandRecursive(childNode, isExpand);
        });
    }
  }

  expandParent() {
    this.bwqEntityTree.forEach( node => {
      this.selectedNodeExpandRecursive(node, true);
    });
    this.parentNode = [];
  }

  selectedNodeExpandRecursive(node: TreeNode, isExpand: boolean) {
    const resultParentNode = this.parentNode.includes(node.label);
    if (resultParentNode) {
      node.expanded = isExpand;
      if (node.children) {
          node.children.forEach( childNode => {
              const resultChildNode = this.parentNode.includes(childNode.label);
              if (resultChildNode) {
                this.selectedNodeExpandRecursive(childNode, isExpand);
              }
          });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.bwqNavSubscription) { this.bwqNavSubscription.unsubscribe(); }
    if (this.bwqEntitySubscription) { this.bwqEntitySubscription.unsubscribe(); }
    if (this.bwqRecordLockSubscription) { this.bwqRecordLockSubscription.unsubscribe(); }
  }

}
