import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionAddDialogComponent } from './collection-add-dialog.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { CollectionService } from 'src/app/shared/services/bwq/collection.service';
import { MessageService } from 'primeng/api';

describe('CollectionAddDialogComponent', () => {
  let component: CollectionAddDialogComponent;
  let fixture: ComponentFixture<CollectionAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule, InputTextareaModule,
        DropdownModule, FormsModule],
      declarations: [ CollectionAddDialogComponent ],
      providers: [GlobalHelperService, CollectionService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
