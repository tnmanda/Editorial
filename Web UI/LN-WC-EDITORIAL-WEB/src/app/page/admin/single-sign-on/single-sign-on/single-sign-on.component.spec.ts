import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSignOnComponent } from './single-sign-on.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleSignOnService } from 'src/app/shared/services/admin/single-sign-on.service';
import { of } from 'rxjs';

class MockSingleSignOnService extends SingleSignOnService {}

describe('SingleSignOnComponent', () => {
  let component: SingleSignOnComponent;
  let fixture: ComponentFixture<SingleSignOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [ SingleSignOnComponent ],
      providers: [
        { provide: SingleSignOnService, useClass: MockSingleSignOnService },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSignOnComponent);
    component = fixture.componentInstance;

    const singleSignOnSrv = fixture.debugElement.injector.get(SingleSignOnService);
    spyOn(singleSignOnSrv, 'getSingleSignOn').and.returnValue(of ( [] ));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
