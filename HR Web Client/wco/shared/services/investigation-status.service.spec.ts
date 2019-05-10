import { TestBed, inject } from '@angular/core/testing';

import { InvestigationStatusService } from './investigation-status.service';

describe('InvestigationStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestigationStatusService]
    });
  });

  it('should be created', inject([InvestigationStatusService], (service: InvestigationStatusService) => {
    expect(service).toBeTruthy();
  }));
});
