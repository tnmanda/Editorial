import { routes } from './app-routing.module';
import { HomeComponent } from './core/home/home.component';
import { CountryListComponent } from './page/admin/country/country-list/country-list.component';
import { AuthGuardService } from './shared/services/admin/auth/auth-guard.service';
import { ErrorPageComponent } from './core/error-page/error-page.component';

describe('app-routing routes', () => {

  it('should have a total of 40 routes', () => {
    expect(routes.length).toBe(40);
  });

  it('should contain a route for home', () => {
    expect(routes).toContain( { path: 'home', component: HomeComponent});
  });

  it('should contain a route for country', () => {
    expect(routes).toContain(
      {
        path: 'country',
        loadChildren: './page/admin/country/country.module#CountryModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for job control', () => {
    expect(routes).toContain(
      {
        path: 'job-control',
        loadChildren: './page/admin/job-control/job-control.module#JobControlModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for office', () => {
    expect(routes).toContain(
      {
        path: 'office',
        loadChildren: './page/admin/office/office.module#OfficeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for page management', () => {
    expect(routes).toContain(
      {
        path: 'page-management',
        loadChildren: './page/admin/page-management/page-management.module#PageManagementModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for role management', () => {
    expect(routes).toContain(
      {
        path: 'role-management',
        loadChildren: './page/admin/role-management/role-management.module#RoleManagementModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for user management', () => {
    expect(routes).toContain(
      {
        path: 'user-management',
        loadChildren: './page/admin/user-management/user-management.module#UserManagementModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for team', () => {
    expect(routes).toContain(
      {
        path: 'team',
        loadChildren: './page/admin/team/team.module#TeamModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for usermap', () => {
    expect(routes).toContain(
      {
        path: 'usermap',
        loadChildren: './page/admin/usermap/usermap.module#UsermapModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for work unit duration', () => {
    expect(routes).toContain(
      {
        path: 'work-unit-duration',
        loadChildren: './page/admin/work-unit-duration/work-unit-duration.module#WorkUnitDurationModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for single sign on', () => {
    expect(routes).toContain(
      {
        path: 'single-sign-on',
        loadChildren: './page/admin/single-sign-on/single-sign-on.module#SingleSignOnModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for absence type', () => {
    expect(routes).toContain(
      {
        path: 'absence-type',
        loadChildren: './page/admin/types/absence-type/absence-type.module#AbsenceTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for address type', () => {
    expect(routes).toContain(
      {
        path: 'address-type',
        loadChildren: './page/admin/types/address-type/address-type.module#AddressTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for assignment type', () => {
    expect(routes).toContain(
      {
        path: 'assignment-type',
        loadChildren: './page/admin/types/assignment-type/assignment-type.module#AssigmentTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for certificate type', () => {
    expect(routes).toContain(
      {
        path: 'certificate-type',
        loadChildren: './page/admin/types/certificate-type/certificate-type.module#CertificateTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for contact type', () => {
    expect(routes).toContain(
      {
        path: 'contact-type',
        loadChildren: './page/admin/types/contact-type/contact-type.module#ContactTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for contract type', () => {
    expect(routes).toContain(
      {
        path: 'contract-type',
        loadChildren: './page/admin/types/contract-type/contract-type.module#ContractTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for departure type', () => {
    expect(routes).toContain(
      {
        path: 'departure-type',
        loadChildren: './page/admin/types/departure-type/departure-type.module#DepartureTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for education type', () => {
    expect(routes).toContain(
      {
        path: 'education-type',
        loadChildren: './page/admin/types/education-type/education-type.module#EducationTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for function type', () => {
    expect(routes).toContain(
      {
        path: 'function-type',
        loadChildren: './page/admin/types/function-type/function-type.module#FunctionTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for gender type', () => {
    expect(routes).toContain(
      {
        path: 'gender-type',
        loadChildren: './page/admin/types/gender-type/gender-type.module#GenderTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for language type', () => {
    expect(routes).toContain(
      {
        path: 'language-type',
        loadChildren: './page/admin/types/language-type/language-type.module#LanguageTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for proficiency type', () => {
    expect(routes).toContain(
      {
        path: 'proficiency-type',
        loadChildren: './page/admin/types/proficiency-type/proficiency-type.module#ProficiencyTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for work unit type', () => {
    expect(routes).toContain(
      {
        path: 'work-unit-type',
        loadChildren: './page/admin/types/work-unit-type/work-unit-type.module#WorkUnitTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for bwq entity management', () => {
    expect(routes).toContain(
      {
        path: 'bwq-entity-management',
        loadChildren: './page/bwq/bwq-entity/bwq-entity.module#BwqEntityModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for bwq management', () => {
    expect(routes).toContain(
      {
        path: 'bwq-management',
        loadChildren: './page/bwq/bwq-management/bwq-management.module#BwqManagementModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for collection', () => {
    expect(routes).toContain(
      {
        path: 'collection',
        loadChildren: './page/bwq/collection/collection.module#CollectionModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for investigation', () => {
    expect(routes).toContain(
      {
        path: 'investigation',
        loadChildren: './page/investigation/investigation/investigation.module#InvestigationModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for activity type', () => {
    expect(routes).toContain(
      {
        path: 'activity-type',
        loadChildren: './page/investigation/activity-type/activity-type.module#ActivityTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for disposition', () => {
    expect(routes).toContain(
      {
        path: 'disposition',
        loadChildren: './page/investigation/disposition/disposition.module#DispositionModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for priority type', () => {
    expect(routes).toContain(
      {
        path: 'priority-type',
        loadChildren: './page/investigation/priority-type/priority-type.module#PriorityTypeModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for status', () => {
    expect(routes).toContain(
      {
        path: 'status',
        loadChildren: './page/investigation/status/status.module#StatusModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for alerts management', () => {
    expect(routes).toContain(
      {
        path: 'alerts-management',
        loadChildren: './page/alerts/alerts/alerts.module#AlertsModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for alerts job', () => {
    expect(routes).toContain(
      {
        path: 'alerts-job',
        loadChildren: './page/alerts/alerts-job/alerts-job.module#AlertsJobModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for alerts inactive', () => {
    expect(routes).toContain(
      {
        path: 'alerts-inactive',
        loadChildren: './page/alerts/reports/alerts-inactive/alerts-inactive.module#AlertsInactiveModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for alerts past due', () => {
    expect(routes).toContain(
      {
        path: 'alerts-past-due',
        loadChildren: './page/alerts/reports/alerts-past-due/alerts-past-due.module#AlertsPastDueModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for news queue', () => {
    expect(routes).toContain(
      {
        path: 'news-queue',
        loadChildren: './page/news/news-queue/news-queue.module#NewsQueueModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for watch management', () => {
    expect(routes).toContain(
      {
        path: 'watch-management',
        loadChildren: './page/news/watch-management/watch-management.module#WatchManagementModule',
        canLoad: [AuthGuardService]
      }
    );
  });

  it('should contain a route for not found', () => {
    expect(routes).toContain({ path : 'not-found', component: ErrorPageComponent});
  });

  it('should contain a route for **', () => {
    expect(routes).toContain( { path : '**', redirectTo: 'not-found'});
  });

});
