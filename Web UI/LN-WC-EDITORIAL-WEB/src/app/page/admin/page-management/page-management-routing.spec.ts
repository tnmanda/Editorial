import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './page-management-routing.module';
import { PageManagementListComponent } from './page-management-list/page-management-list.component';



describe('Page Management routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for page management', () => {

    expect(routes).toContain({ path : '', component : PageManagementListComponent, canActivate: [AuthGuardService]});

  });

});
