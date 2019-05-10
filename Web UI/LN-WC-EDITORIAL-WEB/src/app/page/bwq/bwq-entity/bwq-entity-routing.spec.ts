import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './bwq-entity-routing.module';
import { BwqEntityManagementComponent } from './bwq-entity-management/bwq-entity-management.component';

describe('Bwq Entity routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for bwq entity', () => {

    expect(routes).toContain({ path : '', component : BwqEntityManagementComponent, canActivate: [AuthGuardService]});

  });

});
