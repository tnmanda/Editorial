import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { AuthGuardService } from './shared/services/admin/auth/auth-guard.service';


export const routes: Routes = [
  { path : 'home', component: HomeComponent },
  // Admin Routes
  {
    path: 'country',
    loadChildren: './page/admin/country/country.module#CountryModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'job-control',
    loadChildren: './page/admin/job-control/job-control.module#JobControlModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'office',
    loadChildren: './page/admin/office/office.module#OfficeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'page-management',
    loadChildren: './page/admin/page-management/page-management.module#PageManagementModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'role-management',
    loadChildren: './page/admin/role-management/role-management.module#RoleManagementModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'user-management',
    loadChildren: './page/admin/user-management/user-management.module#UserManagementModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'team',
    loadChildren: './page/admin/team/team.module#TeamModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'usermap',
    loadChildren: './page/admin/usermap/usermap.module#UsermapModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'work-unit-duration',
    loadChildren: './page/admin/work-unit-duration/work-unit-duration.module#WorkUnitDurationModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'single-sign-on',
    loadChildren: './page/admin/single-sign-on/single-sign-on.module#SingleSignOnModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'absence-type',
    loadChildren: './page/admin/types/absence-type/absence-type.module#AbsenceTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'address-type',
    loadChildren: './page/admin/types/address-type/address-type.module#AddressTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'assignment-type',
    loadChildren: './page/admin/types/assignment-type/assignment-type.module#AssigmentTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'certificate-type',
    loadChildren: './page/admin/types/certificate-type/certificate-type.module#CertificateTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'contact-type',
    loadChildren: './page/admin/types/contact-type/contact-type.module#ContactTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'contract-type',
    loadChildren: './page/admin/types/contract-type/contract-type.module#ContractTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'departure-type',
    loadChildren: './page/admin/types/departure-type/departure-type.module#DepartureTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'education-type',
    loadChildren: './page/admin/types/education-type/education-type.module#EducationTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'function-type',
    loadChildren: './page/admin/types/function-type/function-type.module#FunctionTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'gender-type',
    loadChildren: './page/admin/types/gender-type/gender-type.module#GenderTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'language-type',
    loadChildren: './page/admin/types/language-type/language-type.module#LanguageTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'proficiency-type',
    loadChildren: './page/admin/types/proficiency-type/proficiency-type.module#ProficiencyTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'work-unit-type',
    loadChildren: './page/admin/types/work-unit-type/work-unit-type.module#WorkUnitTypeModule',
    canLoad: [AuthGuardService]
  },
  // Bwq Routes
  {
    path: 'bwq-entity-management',
    loadChildren: './page/bwq/bwq-entity/bwq-entity.module#BwqEntityModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'bwq-management',
    loadChildren: './page/bwq/bwq-management/bwq-management.module#BwqManagementModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'collection',
    loadChildren: './page/bwq/collection/collection.module#CollectionModule',
    canLoad: [AuthGuardService]
  },
  // Investigation Routes
  {
    path: 'investigation',
    loadChildren: './page/investigation/investigation/investigation.module#InvestigationModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'activity-type',
    loadChildren: './page/investigation/activity-type/activity-type.module#ActivityTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'disposition',
    loadChildren: './page/investigation/disposition/disposition.module#DispositionModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'priority-type',
    loadChildren: './page/investigation/priority-type/priority-type.module#PriorityTypeModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'status',
    loadChildren: './page/investigation/status/status.module#StatusModule',
    canLoad: [AuthGuardService]
  },
  // Alerts Routes
  {
    path: 'alerts-management',
    loadChildren: './page/alerts/alerts/alerts.module#AlertsModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'alerts-job',
    loadChildren: './page/alerts/alerts-job/alerts-job.module#AlertsJobModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'alerts-inactive',
    loadChildren: './page/alerts/reports/alerts-inactive/alerts-inactive.module#AlertsInactiveModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'alerts-past-due',
    loadChildren: './page/alerts/reports/alerts-past-due/alerts-past-due.module#AlertsPastDueModule',
    canLoad: [AuthGuardService]
  },
  // News Routes
  {
    path: 'news-queue',
    loadChildren: './page/news/news-queue/news-queue.module#NewsQueueModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'watch-management',
    loadChildren: './page/news/watch-management/watch-management.module#WatchManagementModule',
    canLoad: [AuthGuardService]
  },
  { path : 'not-found', component: ErrorPageComponent},
  { path : '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
