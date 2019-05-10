import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './function-type-routing.module';
import { FunctionTypeListComponent } from './function-type-list/function-type-list.component';

describe('Function Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for function type', () => {

    expect(routes).toContain({ path : '', component : FunctionTypeListComponent, canActivate: [AuthGuardService]});

  });

});
