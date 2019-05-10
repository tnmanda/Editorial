import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './status-routing.module';
import { StatusListComponent } from './status-list/status-list.component';

describe('Status routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for status', () => {

    expect(routes).toContain({ path : '', component : StatusListComponent, canActivate: [AuthGuardService]});

  });

});
