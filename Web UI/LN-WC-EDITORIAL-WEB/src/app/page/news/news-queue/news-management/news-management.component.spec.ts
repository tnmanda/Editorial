import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsManagementComponent } from './news-management.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { MessageService } from 'primeng/api';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { TreeModule } from 'primeng/tree';
import { TooltipModule } from 'primeng/tooltip';
import { of } from 'rxjs';

class MockNewsService extends NewsService {}

describe('NewsManagementComponent', () => {
  let component: NewsManagementComponent;
  let fixture: ComponentFixture<NewsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, TreeModule, TooltipModule,
        DialogModule, ToastModule, BrowserAnimationsModule],
      declarations: [ NewsManagementComponent ],
      providers: [
        GlobalHelperService, MessageService,
        { provide: NewsService, useClass: MockNewsService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsManagementComponent);
    component = fixture.componentInstance;

    const statusSrv = fixture.debugElement.injector.get(NewsService);
    spyOn(statusSrv, 'getNavs').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
