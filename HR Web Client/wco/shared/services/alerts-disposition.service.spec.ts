import { TestBed, inject } from '@angular/core/testing';

import { AlertsDispositionService } from './alerts-disposition.service';

describe('AlertsDispositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertsDispositionService]
    });
  });

  it('should be created', inject([AlertsDispositionService], (service: AlertsDispositionService) => {
    expect(service).toBeTruthy();
  }));
});
