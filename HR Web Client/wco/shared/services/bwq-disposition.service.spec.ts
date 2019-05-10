import { TestBed, inject } from '@angular/core/testing';

import { BwqDispositionService } from './bwq-disposition.service';

describe('BwqDispositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BwqDispositionService]
    });
  });

  it('should be created', inject([BwqDispositionService], (service: BwqDispositionService) => {
    expect(service).toBeTruthy();
  }));
});
