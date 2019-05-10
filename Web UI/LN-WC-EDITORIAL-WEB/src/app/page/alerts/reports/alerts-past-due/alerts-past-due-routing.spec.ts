import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './alerts-past-due-routing.module';
import { AlertsPastDueReportComponent } from './alerts-past-due-report/alerts-past-due-report.component';

describe('Alerts Past Due routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for alerts past due', () => {

    expect(routes).toContain({ path : '', component : AlertsPastDueReportComponent, canActivate: [AuthGuardService]});

  });

});
