import { TestBed, inject } from '@angular/core/testing';

import { EditorialFormsService } from './editorial-forms.service';

describe('EditorialFormsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorialFormsService]
    });
  });

  it('should be created', inject([EditorialFormsService], (service: EditorialFormsService) => {
    expect(service).toBeTruthy();
  }));
});
