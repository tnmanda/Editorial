import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { AbsenceTypeListComponent } from './absence-type-list/absence-type-list.component';
import { routes } from './absence-type-routing.module';

describe('Absence Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for absence type', () => {

    expect(routes).toContain({ path : '', component : AbsenceTypeListComponent, canActivate: [AuthGuardService]});

  });

});
