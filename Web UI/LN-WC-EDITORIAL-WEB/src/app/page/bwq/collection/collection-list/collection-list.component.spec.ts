import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionListComponent } from './collection-list.component';
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
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionService } from 'src/app/shared/services/bwq/collection.service';
import { CollectionAddDialogComponent } from '../dialogs/collection-add-dialog/collection-add-dialog.component';
import { CollectionEditDialogComponent } from '../dialogs/collection-edit-dialog/collection-edit-dialog.component';
import { CollectionDeleteDialogComponent } from '../dialogs/collection-delete-dialog/collection-delete-dialog.component';
import { of } from 'rxjs';

class MockCollectionService extends CollectionService {}

describe('CollectionListComponent', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ CollectionListComponent, CollectionAddDialogComponent, CollectionEditDialogComponent,
      CollectionDeleteDialogComponent ],
      providers: [
        { provide: CollectionService, useClass: MockCollectionService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionListComponent);
    component = fixture.componentInstance;

    const collectionSrv = fixture.debugElement.injector.get(CollectionService);
    spyOn(collectionSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
