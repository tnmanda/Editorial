import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationEntityManagementComponent } from './investigation-entity-management.component';
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
import { InvestigationService } from 'src/app/shared/services/investigation/investigation.service';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { of } from 'rxjs';

class MockInvestigationService extends InvestigationService {}

describe('InvestigationEntityManagementComponent', () => {
  let component: InvestigationEntityManagementComponent;
  let fixture: ComponentFixture<InvestigationEntityManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, TooltipModule,
        DialogModule, ToastModule, BrowserAnimationsModule, TreeModule],
      declarations: [ InvestigationEntityManagementComponent ],
      providers: [
                    GlobalHelperService, MessageService,
                    { provide: InvestigationService, useClass: MockInvestigationService },
                  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationEntityManagementComponent);
    component = fixture.componentInstance;

    const investigationSrv = fixture.debugElement.injector.get(InvestigationService);
    spyOn(investigationSrv, 'getNavs').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
