import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTypeListComponent } from './language-type-list.component';
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
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { LanguageTypeAddDialogComponent } from '../dialogs/language-type-add-dialog/language-type-add-dialog.component';
import { LanguageTypeEditDialogComponent } from '../dialogs/language-type-edit-dialog/language-type-edit-dialog.component';
import { LanguageTypeDeleteDialogComponent } from '../dialogs/language-type-delete-dialog/language-type-delete-dialog.component';
import { of } from 'rxjs';

class MockLanguageTypeService extends LanguageTypeService {}

describe('LanguageTypeListComponent', () => {
  let component: LanguageTypeListComponent;
  let fixture: ComponentFixture<LanguageTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, BreadcrumbModule,
        PanelModule, InputTextModule, ButtonModule, TableModule, PaginatorModule, InputTextareaModule,
        DialogModule, ToastModule, InputSwitchModule, BrowserAnimationsModule],
      declarations: [ LanguageTypeListComponent, LanguageTypeAddDialogComponent, LanguageTypeEditDialogComponent,
      LanguageTypeDeleteDialogComponent ],
      providers: [
        { provide: LanguageTypeService, useClass: MockLanguageTypeService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTypeListComponent);
    component = fixture.componentInstance;

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
