import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { JobControlListComponent } from './job-control-list/job-control-list.component';
import { routes } from './job-control-routing.module';


describe('Job Control routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for job control', () => {

    expect(routes).toContain( { path : '', component : JobControlListComponent, canActivate: [AuthGuardService]});

  });

});
