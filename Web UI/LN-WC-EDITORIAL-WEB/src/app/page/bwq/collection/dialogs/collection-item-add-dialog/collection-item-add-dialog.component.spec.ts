import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionItemAddDialogComponent } from './collection-item-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { CollectionItemService } from 'src/app/shared/services/bwq/collection-item.service';
import { MessageService } from 'primeng/api';

describe('CollectionItemAddDialogComponent', () => {
  let component: CollectionItemAddDialogComponent;
  let fixture: ComponentFixture<CollectionItemAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, InputTextModule, ButtonModule, InputTextareaModule, FormsModule],
      declarations: [ CollectionItemAddDialogComponent ],
      providers: [GlobalHelperService, CollectionItemService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionItemAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
