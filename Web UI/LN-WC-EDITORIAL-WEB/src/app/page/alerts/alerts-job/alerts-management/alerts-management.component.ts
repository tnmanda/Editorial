import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { AlertsJobNav, AlertJobEntityData } from 'src/app/shared/models/alerts/alerts-job-nav.model';
import { AlertJobsQueueEntity } from 'src/app/shared/models/alerts/alert-jobs-queue-entity.model';
import { AlertJobsQueueEntityPostData, AlertJobsQueueEntityObject } from 'src/app/shared/models/alerts/alert-job-queue.model';

@Component({
  selector: 'app-alerts-management',
  templateUrl: './alerts-management.component.html',
  styleUrls: ['./alerts-management.component.css'],
  providers: [MessageService]
})
export class AlertsManagementComponent implements OnInit, OnDestroy {

  public items: MenuItem[];
  home: MenuItem;

  alertsJobNavSubscription: Subscription;
  alertsJobSubscription: Subscription;
  alertJobsQueueEntitySubscription: Subscription;

  alertsJobNavs: AlertsJobNav[];
  alertsJobTree: TreeNode[];
  selectedNode: TreeNode;

  parentNode: string[];

  alertJobsQueueEntity: AlertJobsQueueEntity[];

  isTreeLoading: boolean;
  isLoading: boolean;

  thisInterVal: any;
  thisEvent: any;


  constructor(public globalHelperSrv: GlobalHelperService,
              private alertsSrv: AlertsService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {label: 'Alerts'},
      {label: 'Home', url: 'alerts-management'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.parentNode = [];

    this.getNavs();
  }

  getNavs() {
    this.isTreeLoading = true;
    this.alertsSrv.apiUrl = environment.alerts_management.alert_job_queue_entity.nav;
    this.alertsJobNavSubscription = this.alertsSrv.getNavs().subscribe((items: Array<AlertsJobNav>) => {
      this.alertsJobNavs = items;
      this.alertsJobTree = this.alertsJobNavs;

      this.isTreeLoading = false;
    });
  }

  onEdit(alertJobsQueueEntity: AlertJobsQueueEntity) {

    const  alertJobsQueueEntityPostData = new AlertJobsQueueEntityPostData();
    alertJobsQueueEntityPostData.Token = this.globalHelperSrv.getHRToken();
    alertJobsQueueEntityPostData.ModuleTableEntryID = alertJobsQueueEntity.alertJobEntityID;
    alertJobsQueueEntityPostData.appuserid = Number.parseInt(this.globalHelperSrv.getCurrentUserID());
    alertJobsQueueEntityPostData.ProfileId = 0;

    if (alertJobsQueueEntity.workItemID) {

      const redirectURL = environment.hr_web + environment.alert_work_item_route + alertJobsQueueEntity.workItemID;
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
      this.alertsSrv.apiUrl = environment.alerts_management.alert_job_queue_entity.wrkitem;
      this.alertJobsQueueEntitySubscription = this.alertsSrv.postAlertJobsQueueEntity(alertJobsQueueEntityPostData)
      .subscribe((item: AlertJobsQueueEntityObject) => {

        if (item.workItemGuid) {
          const redirectURL = environment.hr_web + environment.alert_work_item_route + item.workItemGuid;
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
  }

  eventMessage(event) {
    this.onRefreshAlertJobsQueueEntityList();
    this.onRefreshTree();
  }

  onRefreshAlertJobsQueueEntityList() {
    if (this.selectedNode !== null) {
      const alertJobEntityData = new AlertJobEntityData();
      alertJobEntityData.alertJobQueueID = this.selectedNode.data.alertJobQueueID;
      alertJobEntityData.dueDate = this.selectedNode.data.due;

      this.alertsSrv.apiUrl = environment.alerts_management.alert_job_queue_entity.filter;
      this.alertsJobSubscription = this.alertsSrv.getAlertJobsQueueEntities(alertJobEntityData)
      .subscribe((items: Array<AlertJobsQueueEntity>) => {
        this.alertJobsQueueEntity = items;

        this.isLoading = false;
      }, (error: Error) => { console.log(error);  this.isLoading = false; });
    }
  }

  nodeSelect(event) {
    // event.node = selected node
    if (event.node.children === undefined) {
      this.isLoading = true;
      this.alertJobsQueueEntity = null;
      this.selectedNode = event.node;

      const alertJobEntityData = new AlertJobEntityData();
      alertJobEntityData.alertJobQueueID = event.node.data.alertJobQueueID;
      alertJobEntityData.dueDate = event.node.data.due;

      this.alertsSrv.apiUrl = environment.alerts_management.alert_job_queue_entity.filter;
      this.alertsJobSubscription = this.alertsSrv.getAlertJobsQueueEntities(alertJobEntityData)
      .subscribe((items: Array<AlertJobsQueueEntity>) => {
        this.alertJobsQueueEntity = items;
        console.log(this.alertJobsQueueEntity);
        this.isLoading = false;
      }, (error: Error) => { console.log(error);  this.isLoading = false; });
    }
  }

  expandAll() {
    this.alertsJobTree.forEach( node => {
          this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.alertsJobTree.forEach( node => {
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
    this.alertsJobTree.forEach( node => {
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

  onRefreshTree() {
    this.isTreeLoading = true;
    this.alertsSrv.apiUrl = environment.alerts_management.alert_job_queue_entity.nav;
    this.alertsJobNavSubscription = this.alertsSrv.getNavs().subscribe((items: Array<AlertsJobNav>) => {
      this.alertsJobNavs = items;
      this.alertsJobTree = this.alertsJobNavs;
      this.getNodeParentRecursive(this.selectedNode);

      this.expandParent();
      this.isTreeLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.alertsJobNavSubscription) { this.alertsJobNavSubscription.unsubscribe(); }
    if (this.alertsJobSubscription) { this.alertsJobSubscription.unsubscribe(); }
    if (this.alertJobsQueueEntitySubscription) { this.alertJobsQueueEntitySubscription.unsubscribe(); }
  }

}
