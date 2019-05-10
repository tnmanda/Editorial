import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { routes } from './collection-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';

describe('Collection routes', () => {

  it('should have a total of 2 routes', () => {

    expect(routes.length).toBe(2);

  });

  it('should contain a route for collection', () => {

    expect(routes).toContain({ path : '', component : CollectionListComponent, canActivate: [AuthGuardService]});

  });

  it('should contain a route for collection detail', () => {

    // tslint:disable-next-line:max-line-length
    expect(routes).toContain({ path : 'collection-detail/:collectionID', component : CollectionDetailComponent, canActivate: [AuthGuardService]});

  });

});
