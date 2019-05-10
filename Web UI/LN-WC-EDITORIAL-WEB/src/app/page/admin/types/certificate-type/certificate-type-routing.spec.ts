import { AuthGuardService } from 'src/app/shared/services/admin/auth/auth-guard.service';
import { CertificateTypeListComponent } from './certificate-type-list/certificate-type-list.component';
import { routes } from './certificate-type-routing.module';

describe('Certificate Type routes', () => {

  it('should have a total of 1 routes', () => {

    expect(routes.length).toBe(1);

  });

  it('should contain a route for certificate type', () => {

    expect(routes).toContain({ path : '', component : CertificateTypeListComponent, canActivate: [AuthGuardService]});

  });

});
