import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './usermap-routing.module';
import { UsermapListComponent } from './usermap-list/usermap-list.component';

describe('Usermap routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for team', () => {

    expect(routes).toContain({ path : '', component : UsermapListComponent, canActivate: [AuthGuardService]});

  });

});
