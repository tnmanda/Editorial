import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './alerts-routing.module';
import { AlertsListComponent } from './alerts-list/alerts-list.component';

describe('Alerts routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for alerts', () => {

    expect(routes).toContain({ path : '', component : AlertsListComponent, canActivate: [AuthGuardService]});

  });

});
