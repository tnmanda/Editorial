import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './user-management-routing.module';
import { UserManagementListComponent } from './user-management-list/user-management-list.component';
import { UserManagementDetailComponent } from './user-management-detail/user-management-detail.component';

describe('User Management routes', () => {

  it('should have a total of 2 routes', () => {

    expect(routes.length).toBe(2);

  });

  it('should contain a route for user management', () => {

    expect(routes).toContain({ path : '', component : UserManagementListComponent, canActivate: [AuthGuardService]});

  });

  it('should contain a route for user management detail', () => {

    // tslint:disable-next-line:max-line-length
    expect(routes).toContain({ path : 'user-management-detail/:appUserID', component : UserManagementDetailComponent, canActivate: [AuthGuardService]});

  });

});
