import { TestBed, inject } from '@angular/core/testing';

import { BwqInstructionService } from './bwq-instruction.service';

describe('BwqInstructionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BwqInstructionService]
    });
  });

  it('should be created', inject([BwqInstructionService], (service: BwqInstructionService) => {
    expect(service).toBeTruthy();
  }));
});
