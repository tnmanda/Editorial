import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './education-type-routing.module';
import { EducationTypeListComponent } from './education-type-list/education-type-list.component';

describe('Education Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for education type', () => {

    expect(routes).toContain({ path : '', component : EducationTypeListComponent, canActivate: [AuthGuardService]});

  });

});
