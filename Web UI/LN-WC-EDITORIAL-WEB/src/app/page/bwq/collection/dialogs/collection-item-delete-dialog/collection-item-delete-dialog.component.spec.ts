import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionItemDeleteDialogComponent } from './collection-item-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CollectionItemService } from 'src/app/shared/services/bwq/collection-item.service';
import { MessageService } from 'primeng/api';

describe('CollectionItemDeleteDialogComponent', () => {
  let component: CollectionItemDeleteDialogComponent;
  let fixture: ComponentFixture<CollectionItemDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ CollectionItemDeleteDialogComponent ],
      providers: [CollectionItemService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionItemDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
