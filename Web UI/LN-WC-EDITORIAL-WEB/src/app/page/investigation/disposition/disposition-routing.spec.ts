import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './disposition-routing.module';
import { DispositionListComponent } from './disposition-list/disposition-list.component';

describe('Disposition routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for disposition', () => {

    expect(routes).toContain({ path : '', component : DispositionListComponent, canActivate: [AuthGuardService]});

  });

});
