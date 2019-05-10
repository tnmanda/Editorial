import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './news-queue-routing.module';
import { NewsManagementComponent } from './news-management/news-management.component';

describe('News Queue routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for news management', () => {

    expect(routes).toContain({ path : '', component : NewsManagementComponent, canActivate: [AuthGuardService]});

  });

});
