import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchKeywordListComponent } from './watch-keyword-list.component';
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
import { WatchKeywordService } from 'src/app/shared/services/news/watch-keyword.service';
import { WatchKeywordAddDialogComponent } from '../dialogs/watch-keyword-add-dialog/watch-keyword-add-dialog.component';
import { WatchKeywordEditDialogComponent } from '../dialogs/watch-keyword-edit-dialog/watch-keyword-edit-dialog.component';
import { WatchKeywordDeleteDialogComponent } from '../dialogs/watch-keyword-delete-dialog/watch-keyword-delete-dialog.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { of } from 'rxjs';

class MockWatchService extends WatchService {}
class MockWatchKeywordService extends WatchKeywordService {}

describe('WatchKeywordListComponent', () => {
  let component: WatchKeywordListComponent;
  let fixture: ComponentFixture<WatchKeywordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputSwitchModule,
        DialogModule, ToastModule, BrowserAnimationsModule],
      declarations: [ WatchKeywordListComponent, WatchKeywordAddDialogComponent, WatchKeywordEditDialogComponent,
      WatchKeywordDeleteDialogComponent ],
      providers: [
        { provide: WatchService, useClass: MockWatchService },
        { provide: WatchKeywordService, useClass: MockWatchKeywordService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchKeywordListComponent);
    component = fixture.componentInstance;

    const watchSrv = fixture.debugElement.injector.get(WatchService);
    spyOn(watchSrv, 'getSingle').and.returnValue(of ( [] ));

    const watchKeywordSrv = fixture.debugElement.injector.get(WatchKeywordService);
    spyOn(watchKeywordSrv, 'getByWatchId').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
