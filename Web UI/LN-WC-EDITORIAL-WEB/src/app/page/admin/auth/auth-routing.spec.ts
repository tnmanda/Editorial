import { routes } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

describe('Auth routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for login ', () => {

    expect(routes).toContain({ path : '', component: LoginComponent });

  });

});
