import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { ContactTypeListComponent } from './contact-type-list/contact-type-list.component';
import { routes } from './contact-type-routing.module';

describe('Contact Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for contact type', () => {

    expect(routes).toContain({ path : '', component : ContactTypeListComponent, canActivate: [AuthGuardService]});

  });

});
