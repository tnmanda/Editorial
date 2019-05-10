import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { AssignmentTypeListComponent } from './assignment-type-list/assignment-type-list.component';
import { routes } from './assignment-type-routing.module';

describe('Assignment Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for assigment type', () => {

    expect(routes).toContain({ path : '', component : AssignmentTypeListComponent, canActivate: [AuthGuardService]});

  });

});
