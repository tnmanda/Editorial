import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './role-management-routing.module';
import { RoleManagementListComponent } from './role-management-list/role-management-list.component';
import { RoleManagementDetailComponent } from './role-management-detail/role-management-detail.component';

describe('Role Management routes', () => {

  it('should have a total of 2 routes', () => {

    expect(routes.length).toBe(2);

  });

  it('should contain a route for role management', () => {

    expect(routes).toContain({ path : '', component : RoleManagementListComponent, canActivate: [AuthGuardService]});

  });

  it('should contain a route for role management detail', () => {

    // tslint:disable-next-line:max-line-length
    expect(routes).toContain({ path : 'role-management-detail/:roleTypeID', component : RoleManagementDetailComponent, canActivate: [AuthGuardService]});

  });

});
