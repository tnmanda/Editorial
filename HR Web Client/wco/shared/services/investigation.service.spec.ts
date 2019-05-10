import { TestBed, inject } from '@angular/core/testing';

import { InvestigationService } from './investigation.service';

describe('InvestigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestigationService]
    });
  });

  it('should be created', inject([InvestigationService], (service: InvestigationService) => {
    expect(service).toBeTruthy();
  }));
});
