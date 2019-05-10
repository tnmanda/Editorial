import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './activity-type-routing.module';
import { ActivityTypeListComponent } from './activity-type-list/activity-type-list.component';


describe('Activity Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for activity type', () => {

    expect(routes).toContain({ path : '', component : ActivityTypeListComponent, canActivate: [AuthGuardService]});

  });

});
