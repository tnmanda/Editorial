import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './priority-type-routing.module';
import { PriorityTypeListComponent } from './priority-type-list/priority-type-list.component';

describe('Priority Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for priority type', () => {

    expect(routes).toContain({ path : '', component : PriorityTypeListComponent, canActivate: [AuthGuardService]});

  });

});
