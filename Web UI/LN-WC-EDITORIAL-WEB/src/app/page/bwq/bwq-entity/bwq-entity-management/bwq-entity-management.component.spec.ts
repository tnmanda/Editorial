import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BwqEntityManagementComponent } from './bwq-entity-management.component';
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
import { TreeModule } from 'primeng/tree';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { BwqService } from 'src/app/shared/services/bwq/bwq.service';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { of } from 'rxjs';

class MockBwqService extends BwqService {}

describe('BwqEntityManagementComponent', () => {
  let component: BwqEntityManagementComponent;
  let fixture: ComponentFixture<BwqEntityManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, TooltipModule,
        DialogModule, ToastModule, BrowserAnimationsModule, TreeModule],
      declarations: [ BwqEntityManagementComponent ],
      providers: [
        GlobalHelperService, MessageService,
        { provide: BwqService, useClass: MockBwqService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BwqEntityManagementComponent);
    component = fixture.componentInstance;

    const bwqService = fixture.debugElement.injector.get(BwqService);
    spyOn(bwqService, 'getNavs').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
