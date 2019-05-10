import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './language-type-routing.module';
import { LanguageTypeListComponent } from './language-type-list/language-type-list.component';

describe('Language Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for language type', () => {

    expect(routes).toContain({ path : '', component : LanguageTypeListComponent, canActivate: [AuthGuardService]});

  });

});
