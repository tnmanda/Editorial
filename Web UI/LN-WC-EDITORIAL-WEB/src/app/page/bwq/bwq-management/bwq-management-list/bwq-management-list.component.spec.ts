import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BwqManagementListComponent } from './bwq-management-list.component';
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
import { BwqService } from 'src/app/shared/services/bwq/bwq.service';
import { CollectionItemService } from 'src/app/shared/services/bwq/collection-item.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressBarModule } from 'primeng/progressbar';
import { of } from 'rxjs';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { EntityService } from 'src/app/shared/services/bwq/entity.service';

class MockBwqService extends BwqService {}
class MockCollectionItemService extends CollectionItemService {}

describe('BwqManagementListComponent', () => {
  let component: BwqManagementListComponent;
  let fixture: ComponentFixture<BwqManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, MultiSelectModule,
        DialogModule, ToastModule, CalendarModule, InputSwitchModule, ProgressBarModule, BrowserAnimationsModule],
      declarations: [ BwqManagementListComponent ],
      providers: [
        { provide: BwqService, useClass: MockBwqService },
        { provide: CollectionItemService, useClass: MockCollectionItemService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(async (() => {
    fixture = TestBed.createComponent(BwqManagementListComponent);
    component = fixture.componentInstance;

    const bwqSrv = fixture.debugElement.injector.get(BwqService);
    spyOn(bwqSrv, 'getAll').and.returnValue(of ( [] ));

    const collectionItemSrv = fixture.debugElement.injector.get(CollectionItemService);
    spyOn(collectionItemSrv, 'getByCollectionID').and.returnValue(of ( [] ));

    fixture.detectChanges();
  }));

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
