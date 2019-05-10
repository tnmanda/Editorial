import { TestBed, inject } from '@angular/core/testing';

import { PriorityTypeService } from './priority-type.service';

describe('PriorityTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriorityTypeService]
    });
  });

  it('should be created', inject([PriorityTypeService], (service: PriorityTypeService) => {
    expect(service).toBeTruthy();
  }));
});
