import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './bwq-management-routing.module';
import { BwqManagementListComponent } from './bwq-management-list/bwq-management-list.component';
import { BwqAddComponent } from './bwq-add/bwq-add.component';

describe('Bwq Management routes', () => {

  it('should have a total of 2 routes', () => {

    expect(routes.length).toBe(2);

  });

  it('should contain a route for bwq management', () => {

    expect(routes).toContain({ path : '', component : BwqManagementListComponent, canActivate: [AuthGuardService]});

  });

  it('should contain a route for bwq management add', () => {

    expect(routes).toContain({ path : 'bwq-add', component : BwqAddComponent, canActivate: [AuthGuardService]});

  });

});
