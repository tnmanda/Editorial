import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, TreeNode, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NewsNav, NewsData } from 'src/app/shared/models/news/news-nav.model';
import { News, NewsHRToken, NewsObject } from 'src/app/shared/models/news/news.model';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.css'],
  providers: [MessageService]
})
export class NewsManagementComponent implements OnInit, OnDestroy  {

  public items: MenuItem[];
  home: MenuItem;

  newsNavSubscription: Subscription;
  newsAllSubscription: Subscription;
  newsObjectSubscription: Subscription;

  newsNav: NewsNav[];
  newsTree: TreeNode[];
  selectedNode: TreeNode;

  parentNode: string[];

  news: News[];

  thisInterVal: any;
  thisEvent: any;

  isTreeLoading: boolean;
  isLoading: boolean;

  constructor(public globalHelperSrv: GlobalHelperService,
              private newsSrv: NewsService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {label: 'News'},
      {label: 'Home', url: 'news-management'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getNavs();
  }

  getNavs() {
    this.isTreeLoading = true;

    const userId = Number.parseInt(this.globalHelperSrv.getCurrentUserID());
    this.newsSrv.apiUrl = environment.news_management.news.nav;
    this.newsNavSubscription = this.newsSrv.getNavs(userId).subscribe((items: Array<NewsNav>) => {
      this.newsNav = items;
      this.newsTree = this.newsNav;

      this.isTreeLoading = false;
    });
  }

  nodeSelect(event) {
    // event.node = selected node
    if (event.node.children === undefined) {
      this.isLoading = true;
      this.news = null;
      this.selectedNode = event.node;

      const newsData = new NewsData();
      newsData.appUserID = Number.parseInt(this.globalHelperSrv.getCurrentUserID());
      newsData.watchID = event.node.data.watchID;
      newsData.countryID = event.node.data.countryID;
      newsData.state = 0;
      this.newsSrv.apiUrl = environment.news_management.news.filter;
      this.newsAllSubscription = this.newsSrv.getNews(newsData).subscribe((items: Array<News>) => {
        this.news = items;
        console.log(this.news);
        this.isLoading = false;
      }, (error: Error) => { console.log(error);  this.isLoading = false; });
    }
  }

  onEdit(news: News) {
    const  newsHRToken = new NewsHRToken();
    newsHRToken.Token = this.globalHelperSrv.getHRToken();
    newsHRToken.ModuleTableEntryID = news.id;
    newsHRToken.ProfileId = 0;
    console.log(newsHRToken);

    this.newsSrv.apiUrl = environment.news_management.news.watch;
    this.newsObjectSubscription = this.newsSrv.getNewsObject(newsHRToken).subscribe((item: NewsObject) => {
      console.log(item.workItemGuid);
      if (item.workItemGuid) {
        const redirectURL = environment.hr_web + environment.news_work_item_route + item.workItemGuid;
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

  expandAll() {
    this.newsTree.forEach( node => {
          this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.newsTree.forEach( node => {
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
    this.newsTree.forEach( node => {
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
    if (this.newsNavSubscription) { this.newsNavSubscription.unsubscribe(); }
    if (this.newsAllSubscription) { this.newsAllSubscription.unsubscribe(); }
    if (this.newsObjectSubscription) { this.newsObjectSubscription.unsubscribe(); }
  }

}
