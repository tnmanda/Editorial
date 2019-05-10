import { TestBed, inject } from '@angular/core/testing';

import { InvestigationActivityService } from './investigation-activity.service';

describe('InvestigationActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestigationActivityService]
    });
  });

  it('should be created', inject([InvestigationActivityService], (service: InvestigationActivityService) => {
    expect(service).toBeTruthy();
  }));
});
