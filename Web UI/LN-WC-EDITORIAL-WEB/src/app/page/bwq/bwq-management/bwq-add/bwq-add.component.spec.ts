import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BwqAddComponent } from './bwq-add.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { DatePipe } from '@angular/common';
import { CollectionItemService } from 'src/app/shared/services/bwq/collection-item.service';
import { BwqFieldSelectService } from 'src/app/shared/services/bwq/bwq-field-select.service';
import { BwqService } from 'src/app/shared/services/bwq/bwq.service';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { SelectParamDialogComponent } from '../dialogs/select-param-dialog/select-param-dialog.component';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { PaginatorModule } from 'primeng/paginator';
import { of } from 'rxjs';
import { CountryService } from 'src/app/shared/services/admin/country.service';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { EntityService } from 'src/app/shared/services/bwq/entity.service';

class MockCollectionItemService extends CollectionItemService {}
class MockBwqFieldSelectService extends BwqFieldSelectService {}
class MockCountryService extends CountryService {}
class MockAppUserService extends AppUserService {}
class MockEntityService extends EntityService {}

describe('BwqAddComponent', () => {
  let component: BwqAddComponent;
  let fixture: ComponentFixture<BwqAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule, BreadcrumbModule, PanelModule,
        TableModule, PaginatorModule, ToastModule, MultiSelectModule, ProgressBarModule,
        BrowserAnimationsModule, InputTextModule, InputTextareaModule, CalendarModule, ButtonModule, InputSwitchModule,
        DropdownModule, FormsModule],
      declarations: [ BwqAddComponent, SelectParamDialogComponent ],
      providers: [
        GlobalHelperService, DatePipe, BwqService, MessageService,
        { provide: CollectionItemService, useClass: MockCollectionItemService },
        { provide: BwqFieldSelectService, useClass: MockBwqFieldSelectService },
        { provide: CountryService, useClass: MockCountryService },
        { provide: AppUserService, useClass: MockAppUserService },
        { provide: EntityService, useClass: MockEntityService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BwqAddComponent);
    component = fixture.componentInstance;

    const collectionItemSrv = fixture.debugElement.injector.get(CollectionItemService);
    spyOn(collectionItemSrv, 'getByCollectionID').and.returnValue(of ( [] ));

    const bwqFieldSelectSrv = fixture.debugElement.injector.get(BwqFieldSelectService);
    spyOn(bwqFieldSelectSrv, 'getAll').and.returnValue(of ( [] ));

    const countrySrv = fixture.debugElement.injector.get(CountryService);
    spyOn(countrySrv, 'getAll').and.returnValue(of ( [] ));

    const appUserSrv = fixture.debugElement.injector.get(AppUserService);
    spyOn(appUserSrv, 'getAll').and.returnValue(of ( [] ));

    const entitySrv = fixture.debugElement.injector.get(EntityService);
    spyOn(entitySrv, 'getSources').and.returnValue(of ( [] ));
    spyOn(entitySrv, 'getCategories').and.returnValue(of ( [] ));
    spyOn(entitySrv, 'getSubCategories').and.returnValue(of ( [] ));
    spyOn(entitySrv, 'getLevels').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
