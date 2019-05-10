import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './alerts-inactive-routing.module';
import { AlertsInactiveReportComponent } from './alerts-inactive-report/alerts-inactive-report.component';

describe('Alerts Inactive routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for alerts inactive report', () => {

    expect(routes).toContain({ path : '', component : AlertsInactiveReportComponent, canActivate: [AuthGuardService]});

  });

});
