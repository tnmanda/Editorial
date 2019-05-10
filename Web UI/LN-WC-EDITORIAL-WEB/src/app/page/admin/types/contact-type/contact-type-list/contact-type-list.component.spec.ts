import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypeListComponent } from './contact-type-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactTypeService } from 'src/app/shared/services/admin/types/contact-type.service';
import { ContactTypeDeleteDialogComponent } from '../dialogs/contact-type-delete-dialog/contact-type-delete-dialog.component';
import { ContactTypeAddDialogComponent } from '../dialogs/contact-type-add-dialog/contact-type-add-dialog.component';
import { ContactTypeEditDialogComponent } from '../dialogs/contact-type-edit-dialog/contact-type-edit-dialog.component';
import { of } from 'rxjs';

class MockContactTypeService extends ContactTypeService {}

describe('ContactTypeListComponent', () => {
  let component: ContactTypeListComponent;
  let fixture: ComponentFixture<ContactTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ ContactTypeListComponent, ContactTypeAddDialogComponent, ContactTypeEditDialogComponent,
      ContactTypeDeleteDialogComponent ],
      providers: [
        { provide: ContactTypeService, useClass: MockContactTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTypeListComponent);
    component = fixture.componentInstance;

    const contactTypeSrv = fixture.debugElement.injector.get(ContactTypeService);
    spyOn(contactTypeSrv, 'getAll').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
