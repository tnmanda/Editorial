import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './work-unit-duration-routing.module';
import { WorkUnitDurationListComponent } from './work-unit-duration-list/work-unit-duration-list.component';

describe('Work Unit Duration routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for work unit duration', () => {

    expect(routes).toContain({ path : '', component : WorkUnitDurationListComponent, canActivate: [AuthGuardService]});

  });

});
