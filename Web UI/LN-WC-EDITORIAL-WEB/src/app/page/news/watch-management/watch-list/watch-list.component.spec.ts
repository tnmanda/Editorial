import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchListComponent } from './watch-list.component';
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
import { WatchService } from 'src/app/shared/services/news/watch.service';
import { WatchAddDialogComponent } from '../dialogs/watch-add-dialog/watch-add-dialog.component';
import { WatchEditDialogComponent } from '../dialogs/watch-edit-dialog/watch-edit-dialog.component';
import { WatchDeleteDialogComponent } from '../dialogs/watch-delete-dialog/watch-delete-dialog.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { of } from 'rxjs';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';

class MockWatchService extends WatchService {}
class MockLanguageTypeService extends LanguageTypeService {}

describe('WatchListComponent', () => {
  let component: WatchListComponent;
  let fixture: ComponentFixture<WatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputSwitchModule,
        DialogModule, ToastModule, BrowserAnimationsModule],
      declarations: [ WatchListComponent, WatchAddDialogComponent, WatchEditDialogComponent,
      WatchDeleteDialogComponent],
      providers: [
        { provide: WatchService, useClass: MockWatchService },
        { provide: LanguageTypeService, useClass: MockLanguageTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchListComponent);
    component = fixture.componentInstance;

    const watchSrv = fixture.debugElement.injector.get(WatchService);
    spyOn(watchSrv, 'getAll').and.returnValue(of ( [] ));

    const languageTypeSrv = fixture.debugElement.injector.get(LanguageTypeService);
    spyOn(languageTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
