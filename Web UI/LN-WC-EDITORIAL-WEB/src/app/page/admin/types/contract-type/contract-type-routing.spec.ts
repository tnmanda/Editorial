import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './contract-type-routing.module';
import { ContractTypeListComponent } from './contract-type-list/contract-type-list.component';

describe('Contract Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for contract type', () => {

    expect(routes).toContain(  { path : '', component : ContractTypeListComponent, canActivate: [AuthGuardService]}, );

  });

});
