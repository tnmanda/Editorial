import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './watch-management-routing.module';
import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchKeywordListComponent } from './watch-keyword-list/watch-keyword-list.component';

describe('Watch Management routes', () => {

  it('should have a total of 2 routes', () => {

    expect(routes.length).toBe(2);

  });

  it('should contain a route for watch management', () => {

    expect(routes).toContain({ path : '', component : WatchListComponent, canActivate: [AuthGuardService]});

  });

  it('should contain a route for watch keyword', () => {

    expect(routes).toContain({ path : 'keyword-list/:watchID', component : WatchKeywordListComponent, canActivate: [AuthGuardService]});

  });

});
