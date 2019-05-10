import { TestBed, inject } from '@angular/core/testing';

import { InvestigationDispositionsService } from './investigation-dispositions.service';

describe('InvestigationDispositionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestigationDispositionsService]
    });
  });

  it('should be created', inject([InvestigationDispositionsService], (service: InvestigationDispositionsService) => {
    expect(service).toBeTruthy();
  }));
});
