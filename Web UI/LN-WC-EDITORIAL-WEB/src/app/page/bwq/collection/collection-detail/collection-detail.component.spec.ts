import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDetailComponent } from './collection-detail.component';
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
import { CollectionService } from 'src/app/shared/services/bwq/collection.service';
import { CollectionItemService } from 'src/app/shared/services/bwq/collection-item.service';
import { CollectionItemAddDialogComponent } from '../dialogs/collection-item-add-dialog/collection-item-add-dialog.component';
import { CollectionItemEditDialogComponent } from '../dialogs/collection-item-edit-dialog/collection-item-edit-dialog.component';
import { CollectionItemDeleteDialogComponent } from '../dialogs/collection-item-delete-dialog/collection-item-delete-dialog.component';
import { of } from 'rxjs';

class MockCollectionService extends CollectionService {}
class MockCollectionItemService extends CollectionItemService {}

describe('CollectionDetailComponent', () => {
  let component: CollectionDetailComponent;
  let fixture: ComponentFixture<CollectionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule,
        DialogModule, ToastModule, BrowserAnimationsModule],
      declarations: [ CollectionDetailComponent, CollectionItemAddDialogComponent, CollectionItemEditDialogComponent,
      CollectionItemDeleteDialogComponent ],
      providers: [
        { provide: CollectionService, useClass: MockCollectionService },
        { provide: CollectionItemService, useClass: MockCollectionItemService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDetailComponent);
    component = fixture.componentInstance;

    const collectionSrv = fixture.debugElement.injector.get(CollectionService);
    spyOn(collectionSrv, 'getAll').and.returnValue(of ( [] ));

    const collectionItemSrv = fixture.debugElement.injector.get(CollectionItemService);
    spyOn(collectionItemSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
