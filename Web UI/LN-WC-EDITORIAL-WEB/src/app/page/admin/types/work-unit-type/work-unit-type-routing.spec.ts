import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './work-unit-type-routing.module';
import { WorkUnitTypeListComponent } from './work-unit-type-list/work-unit-type-list.component';

describe('Work Unit Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for work unit type', () => {

    expect(routes).toContain({ path : '', component : WorkUnitTypeListComponent, canActivate: [AuthGuardService]});

  });

});
