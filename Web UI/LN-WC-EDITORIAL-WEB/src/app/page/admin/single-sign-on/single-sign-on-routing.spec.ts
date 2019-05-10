import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './single-sign-on-routing.module';
import { SingleSignOnComponent } from './single-sign-on/single-sign-on.component';

describe('Single Sign On routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for single sign on', () => {

    expect(routes).toContain( { path : '', component : SingleSignOnComponent, canActivate: [AuthGuardService]});

  });

});
