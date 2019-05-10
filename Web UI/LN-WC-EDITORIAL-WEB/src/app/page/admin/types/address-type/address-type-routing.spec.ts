import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { AddressTypeListComponent } from './address-type-list/address-type-list.component';
import { routes } from './address-type-routing.module';

describe('Address Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for address type', () => {

    expect(routes).toContain({ path : '', component : AddressTypeListComponent, canActivate: [AuthGuardService]});

  });

});
