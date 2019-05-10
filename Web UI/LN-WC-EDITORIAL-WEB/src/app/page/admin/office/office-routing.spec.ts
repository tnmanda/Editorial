import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { OfficeListComponent } from './office-list/office-list.component';
import { routes } from './office-routing.module';


describe('Office routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for office', () => {

    expect(routes).toContain( { path : '', component : OfficeListComponent, canActivate: [AuthGuardService]});

  });

});
