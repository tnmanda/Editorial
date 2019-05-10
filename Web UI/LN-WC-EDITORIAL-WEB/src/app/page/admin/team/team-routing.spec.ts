import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { TeamListComponent } from './team-list/team-list.component';
import { routes } from './team-routing.module';

describe('Team routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for team', () => {

    expect(routes).toContain({ path : '', component : TeamListComponent, canActivate: [AuthGuardService]});

  });

});
