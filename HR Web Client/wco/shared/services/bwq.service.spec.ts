import { TestBed, inject } from '@angular/core/testing';

import { BwqService } from './bwq.service';

describe('BwqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BwqService]
    });
  });

  it('should be created', inject([BwqService], (service: BwqService) => {
    expect(service).toBeTruthy();
  }));
});
