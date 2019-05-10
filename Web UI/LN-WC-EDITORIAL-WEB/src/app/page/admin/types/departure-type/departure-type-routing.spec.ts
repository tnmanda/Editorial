import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './departure-type-routing.module';
import { DepartureTypeListComponent } from './departure-type-list/departure-type-list.component';

describe('Departure Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for departure type', () => {

    expect(routes).toContain({ path : '', component : DepartureTypeListComponent, canActivate: [AuthGuardService]});

  });

});
