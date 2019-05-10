import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './gender-type-routing.module';
import { GenderTypeListComponent } from './gender-type-list/gender-type-list.component';

describe('Gender Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for gender type', () => {

    expect(routes).toContain({ path : '', component : GenderTypeListComponent, canActivate: [AuthGuardService]});

  });

});
