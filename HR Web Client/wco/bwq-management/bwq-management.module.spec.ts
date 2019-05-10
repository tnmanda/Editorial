import { BwqManagementModule } from './bwq-management.module';

describe('BwqManagementModule', () => {
  let bwqManagementModule: BwqManagementModule;

  beforeEach(() => {
    bwqManagementModule = new BwqManagementModule();
  });

  it('should create an instance', () => {
    expect(bwqManagementModule).toBeTruthy();
  });
});
