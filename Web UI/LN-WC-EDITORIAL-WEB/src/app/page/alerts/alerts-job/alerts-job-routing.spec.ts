import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './alerts-job-routing.module';
import { AlertsManagementComponent } from './alerts-management/alerts-management.component';

describe('Alerts Job routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for alerts job', () => {

    expect(routes).toContain({ path : '', component : AlertsManagementComponent, canActivate: [AuthGuardService]});

  });

});
