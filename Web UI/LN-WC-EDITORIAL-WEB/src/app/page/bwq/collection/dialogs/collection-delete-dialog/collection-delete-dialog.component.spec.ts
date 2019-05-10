import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDeleteDialogComponent } from './collection-delete-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CollectionService } from 'src/app/shared/services/bwq/collection.service';
import { MessageService } from 'primeng/api';

describe('CollectionDeleteDialogComponent', () => {
  let component: CollectionDeleteDialogComponent;
  let fixture: ComponentFixture<CollectionDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, DialogModule,
        BrowserAnimationsModule, ButtonModule, FormsModule],
      declarations: [ CollectionDeleteDialogComponent ],
      providers: [CollectionService, MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
