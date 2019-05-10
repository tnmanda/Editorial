import { routes } from './country-routing.module';
import { CountryListComponent } from './country-list/country-list.component';
import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';


describe('Country routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for country ', () => {

    expect(routes).toContain( { path : '', component : CountryListComponent, canActivate: [AuthGuardService]});

  });

});
