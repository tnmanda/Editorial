import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './investigation-routing.module';
import { InvestigationEntityManagementComponent } from './investigation-entity-management/investigation-entity-management.component';

describe('Investigation routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for investigation', () => {

    expect(routes).toContain({ path : '', component : InvestigationEntityManagementComponent, canActivate: [AuthGuardService]});

  });

});
