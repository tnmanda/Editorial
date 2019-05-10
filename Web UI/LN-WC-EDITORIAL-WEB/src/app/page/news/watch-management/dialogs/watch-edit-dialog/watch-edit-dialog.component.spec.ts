import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchEditDialogComponent } from './watch-edit-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { WatchService } from 'src/app/shared/services/news/watch.service';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockLanguageTypeService extends LanguageTypeService {}

describe('WatchEditDialogComponent', () => {
  let component: WatchEditDialogComponent;
  let fixture: ComponentFixture<WatchEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, InputTextareaModule, ButtonModule, InputSwitchModule,
        DropdownModule, FormsModule],
      declarations: [ WatchEditDialogComponent ],
      providers: [
        WatchService, MessageService,
        { provide: LanguageTypeService, useClass: MockLanguageTypeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchEditDialogComponent);
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
