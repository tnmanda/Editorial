import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './proficiency-type-routing.module';
import { ProficiencyTypeListComponent } from './proficiency-type-list/proficiency-type-list.component';

describe('Proficiency Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for proficiency type', () => {

    expect(routes).toContain({ path : '', component : ProficiencyTypeListComponent, canActivate: [AuthGuardService]});

  });

});
