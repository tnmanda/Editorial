import { Component, OnInit, OnDestroy } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUserService } from '../../../../shared/services/admin/app-user.service';
import { environment } from '../../../../../environments/environment';
import { AppUser } from '../../../../shared/models/admin/app-user.model';
import { GenderTypeService } from '../../../../shared/services/admin/types/gender-type.service';
import { OfficeService } from '../../../../shared/services/admin/office.service';
import { OperationalRoleTypeService } from '../../../../shared/services/admin/operational-role-type.service';
import { AppUserAbsenceService } from '../../../../shared/services/admin/app_user/app-user-absence.service';
import { AppUserAddressService } from '../../../../shared/services/admin/app_user/app-user-address.service';
import { AppUserCertificateService } from '../../../../shared/services/admin/app_user/app-user-certificate.service';
import { AppUserContact } from '../../../../shared/models/admin/app_user/app-user-contact.model';
import { AppUserContactService } from '../../../../shared/services/admin/app_user/app-user-contact.service';
import { AppUserContractService } from '../../../../shared/services/admin/app_user/app-user-contract.service';
import { AppUserCountry } from '../../../../shared/models/admin/app_user/app-user-country.model';
import { AppUserCountryService } from '../../../../shared/services/admin/app_user/app-user-country.service';
import { AppUserEducationService } from '../../../../shared/services/admin/app_user/app-user-education.service';
import { AppUserEmploymentRecordService } from '../../../../shared/services/admin/app_user/app-user-employment-record.service';
import { AppUserFunctionService } from '../../../../shared/services/admin/app_user/app-user-function.service';
import { AppUserInRoleService } from '../../../../shared/services/admin/app_user/app-user-in-role.service';
import { AppUserLanguageService } from '../../../../shared/services/admin/app_user/app-user-language.service';
import { AppUserNoteService } from '../../../../shared/services/admin/app_user/app-user-note.service';
import { AppUserResearchTeamService } from '../../../../shared/services/admin/app_user/app-user-research-team.service';
import { AppUserTeamAssignmentService } from '../../../../shared/services/admin/app_user/app-user-team-assignment.service';
import { AppUserTeamService } from '../../../../shared/services/admin/app_user/app-user-team.service';
import { AppUserAbsence } from '../../../../shared/models/admin/app_user/app-user-absence.model';
import { AppUserAddress } from '../../../../shared/models/admin/app_user/app-user-address.model';
import { AppUserCertificate } from '../../../../shared/models/admin/app_user/app-user-certificate.model';
import { AppUserContract } from '../../../../shared/models/admin/app_user/app-user-contract.model';
import { AppUserEducation } from '../../../../shared/models/admin/app_user/app-user-education.model';
import { AppUserEmploymentRecord } from '../../../../shared/models/admin/app_user/app-user-employment-record.model';
import { AppUserFunction } from '../../../../shared/models/admin/app_user/app-user-function.model';
import { AppUserInRole } from '../../../../shared/models/admin/app_user/app-user-in-role.model';
import { AppUserLanguage } from '../../../../shared/models/admin/app_user/app-user-language.model';
import { AppUserNote } from '../../../../shared/models/admin/app_user/app-user-note.model';
import { AppUserResearchTeam } from '../../../../shared/models/admin/app_user/app-user-research-team.model';
import { AppUserTeamAssignment } from '../../../../shared/models/admin/app_user/app-user-team-assignment.model';
import { AppUserTeam } from '../../../../shared/models/admin/app_user/app-user-team.model';
import { AbsenceTypeService } from '../../../../shared/services/admin/types/absence-type.service';
@Component({
  selector: 'app-user-management-detail',
  templateUrl: './user-management-detail.component.html',
  styleUrls: ['./user-management-detail.component.css'],
  providers: [MessageService]
})
export class UserManagementDetailComponent implements OnInit, OnDestroy {

  selectedAppUser: AppUser;
  selectedAppUserID: any;

  public items: MenuItem[];
  home: MenuItem;

  selectedAppUserAbsence: AppUserAbsence;
  selectedAppUserAddress: AppUserAddress;
  selectedAppUserCertificate: AppUserCertificate;
  selectedAppUserContact: AppUserContact;
  selectedAppUserContract: AppUserContract;
  selectedAppUserCountry: AppUserCountry;
  selectedAppUserEducation: AppUserEducation;
  selectedAppUserEmploymentRecord: AppUserEmploymentRecord;
  selectedAppUserFunction: AppUserFunction;
  selectedAppUserInRole: AppUserInRole;
  selectedAppUserLanguage: AppUserLanguage;
  selectedAppUserNote: AppUserNote;
  selectedAppUserResearchTeam: AppUserResearchTeam;
  selectedAppUserTeam: AppUserTeam;
  selectedAppUserTeamAssignment: AppUserTeamAssignment;

  appUserSubscription: Subscription;

  appUserAbsenceAllSubscription: Subscription;
  appUserAbsenceOneSubscription: Subscription;

  appUserAddressAllSubscription: Subscription;
  appUserAddressOneSubscription: Subscription;

  appUserCertificateAllSubscription: Subscription;
  appUserCertificateOneSubscription: Subscription;

  appUserContactAllSubscription: Subscription;
  appUserContactOneSubscription: Subscription;

  appUserContractAllSubscription: Subscription;
  appUserContractOneSubscription: Subscription;

  appUserCountryAllSubscription: Subscription;
  appUserCountryOneSubscription: Subscription;

  appUserEducationAllSubscription: Subscription;
  appUserEducationOneSubscription: Subscription;

  appUserEmploymentRecordAllSubscription: Subscription;
  appUserEmploymentRecordOneSubscription: Subscription;

  appUserFunctionAllSubscription: Subscription;
  appUserFunctionOneSubscription: Subscription;

  appUserInRoleAllSubscription: Subscription;
  appUserInRoleOneSubscription: Subscription;

  appUserLanguageAllSubscription: Subscription;
  appUserLanguageOneSubscription: Subscription;

  appUserNoteAllSubscription: Subscription;
  appUserNoteOneSubscription: Subscription;

  appUserResearchTeamAllSubscription: Subscription;
  appUserResearchTeamOneSubscription: Subscription;

  appUserTeamAssignmentAllSubscription: Subscription;
  appUserTeamAssignmentOneSubscription: Subscription;

  appUserTeamAllSubscription: Subscription;
  appUserTeamOneSubscription: Subscription;

  appUserAbsences: AppUserAbsence[];
  appUserAddresses: AppUserAddress[];
  appUserCertificates: AppUserCertificate[];
  appUserContacts: AppUserContact[];
  appUserContracts: AppUserContract[];
  appUserCountries: AppUserCountry[];
  appUserEducations: AppUserEducation[];
  appUserEmploymentRecords: AppUserEmploymentRecord[];
  appUserFunctions: AppUserFunction[];
  appUserInRoles: AppUserInRole[];
  appUserLanguages: AppUserLanguage[];
  appUserNotes: AppUserNote[];
  appUserResearchTeams: AppUserResearchTeam[];
  appUserTeamAssignments: AppUserTeamAssignment[];
  appUserTeams: AppUserTeam[];

  displayAppUserAbsenceAddDialog = false;
  displayAppUserAbsenceDeleteDialog = false;
  displayAppUserAddressAddDialog = false;
  displayAppUserAddressDeleteDialog = false;
  displayAppUserCertificateAddDialog = false;
  displayAppUserCertificateDeleteDialog = false;
  displayAppUserContactAddDialog = false;
  displayAppUserContactDeleteDialog = false;
  displayAppUserContractAddDialog = false;
  displayAppUserContractDeleteDialog = false;
  displayAppUserCountryAddDialog = false;
  displayAppUserCountryDeleteDialog = false;
  displayAppUserEducationAddDialog = false;
  displayAppUserEducationDeleteDialog = false;
  displayAppUserEmploymentRecordAddDialog = false;
  displayAppUserEmploymentRecordDeleteDialog = false;
  displayAppUserFunctionAddDialog = false;
  displayAppUserFunctionDeleteDialog = false;
  displayAppUserInRoleAddDialog = false;
  displayAppUserInRoleDeleteDialog = false;
  displayAppUserLanguageAddDialog = false;
  displayAppUserLanguageDeleteDialog = false;
  displayAppUserNoteAddDialog = false;
  displayAppUserNoteDeleteDialog = false;
  displayAppUserResearchTeamAddDialog = false;
  displayAppUserResearchTeamDeleteDialog = false;
  displayAppUserTeamAddDialog = false;
  displayAppUserTeamDeleteDialog = false;
  displayAppUserTeamAssignmentAddDialog = false;
  displayAppUserTeamAssignmentDeleteDialog = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private appUserSrv: AppUserService,
              private appUserAbsenceSrv: AppUserAbsenceService,
              private appUserAddressSrv: AppUserAddressService,
              private appUserCertificateSrv: AppUserCertificateService,
              private appUserContactSrv: AppUserContactService,
              private appUserContractSrv: AppUserContractService,
              private appUserCountrySrv: AppUserCountryService,
              private appUserEducationSrv: AppUserEducationService,
              private appUserEmploymentRecordSrv: AppUserEmploymentRecordService,
              private appUserFunctionSrv: AppUserFunctionService,
              private appUserInRoleSrv: AppUserInRoleService,
              private appUserLanguageSrv: AppUserLanguageService,
              private appUserNoteSrv: AppUserNoteService,
              private appUserResearchTeamSrv: AppUserResearchTeamService,
              private appUserTeamAssignmentSrv: AppUserTeamAssignmentService,
              private appUserTeamSrv: AppUserTeamService) { }

  ngOnInit() {
    this.getAppUserInfo();

    this.items = [
      {label: 'Administrator'},
      {label: 'User Management', url: 'user-management'},
      {label: 'Details', url: 'user-management-detail/' + this.selectedAppUserID},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};


    this.getAppUserAbsences();
    this.getAppUserAddresses();
    this.getAppUserCertificates();
    this.getAppUserInRole();
    this.getAppUserContact();
    this.getAppUserContract();
    this.getAppUserCountries();
    this.getAppUserEducation();
    this.getAppUserEmploymentRecords();
    this.getAppUserFunctions();
    this.getAppUserLanguages();
    this.getAppUserNotes();
    this.getAppUserResearchTeams();
    this.getAppUserTeamAssignments();
    this.getAppUserTeams();
  }

  getAppUserInfo() {
    if (this.route.snapshot.params['appUserID']) {
      this.selectedAppUserID = this.route.snapshot.params['appUserID'];
      if (this.selectedAppUserID) {
        console.log(this.selectedAppUserID);
        this.appUserSrv.apiUrl = environment.app_user.detail;
        this.appUserSubscription = this.appUserSrv.getAll().subscribe((items: Array<AppUser>) => {
          if (items !== null || items !== undefined) {
            this.selectedAppUser = items.find(i => i.appUserID.toString() === this.selectedAppUserID);
            console.log(this.items);
          }
        });
      }
    }
  }
  // --------- App User Absence --------------
  getAppUserAbsences() {
    this.appUserAbsenceSrv.apiUrl = environment.app_user.absence.byAppUserId;
    this.appUserAbsenceAllSubscription = this.appUserAbsenceSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserAbsence>) => {
      this.appUserAbsences = items;
    });
  }

  showAppUserAbsenceAddDialog() {
    this.displayAppUserAbsenceAddDialog = true;
  }

  onAppUserAbsenceAddDialogClose(event) {
    this.displayAppUserAbsenceAddDialog = event;
    this.getAppUserAbsences();
  }

  showAppUserAbsenceDeleteDialog(appUserAbsenceID) {
    this.displayAppUserAbsenceDeleteDialog = true;
    this.appUserAbsenceSrv.apiUrl = environment.app_user.absence.root;
    this.appUserAbsenceOneSubscription =  this.appUserAbsenceSrv.getSingle(appUserAbsenceID).subscribe((item: AppUserAbsence) => {
      this.selectedAppUserAbsence = item;
    });
  }

  onAppUserAbsenceDeleteDialogClose(event) {
    this.displayAppUserAbsenceDeleteDialog = event;
    this.getAppUserAbsences();
  }

  // --------- App User Address --------------
  getAppUserAddresses() {
    this.appUserAddressSrv.apiUrl = environment.app_user.address.byAppUserId;
    this.appUserAddressAllSubscription = this.appUserAddressSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserAddress>) => {
      this.appUserAddresses = items;
    });
  }

  showAppUserAddressAddDialog() {
    this.displayAppUserAddressAddDialog = true;
  }

  onAppUserAddressAddDialogClose(event) {
    this.displayAppUserAddressAddDialog = event;
    this.getAppUserAddresses();
  }


  showAppUserAddressDeleteDialog(addressTypeID) {
    this.displayAppUserAddressDeleteDialog = true;
    this.appUserAddressSrv.apiUrl = environment.app_user.address.root;
    this.appUserAddressOneSubscription =  this.appUserAddressSrv.getSingle(addressTypeID).subscribe((item: AppUserAddress) => {
      this.selectedAppUserAddress = item;
    });
  }

  onAppUserAddressDeleteDialogClose(event) {
    this.displayAppUserAddressDeleteDialog = event;
    this.getAppUserAddresses();
  }

  // --------- App User Certificate --------------
  getAppUserCertificates() {
    this.appUserCertificateSrv.apiUrl = environment.app_user.certificate.byAppUserId;
    this.appUserCertificateAllSubscription = this.appUserCertificateSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserCertificate>) => {
      this.appUserCertificates = items;
      console.log(this.appUserCertificates);
    });
  }

  showAppUserCertificateAddDialog() {
    this.displayAppUserCertificateAddDialog = true;
  }

  onAppUserCertificateAddDialogClose(event) {
    this.displayAppUserCertificateAddDialog = event;
    this.getAppUserCertificates();
  }

  showAppUserCertificateDeleteDialog(appUserCertificateID) {
    this.displayAppUserCertificateDeleteDialog = true;
    this.appUserCertificateSrv.apiUrl = environment.app_user.certificate.root;
    this.appUserCertificateOneSubscription =  this.appUserCertificateSrv.getSingle(appUserCertificateID)
    .subscribe((item: AppUserCertificate) => {
      this.selectedAppUserCertificate = item;
    });
  }

  onAppUserCertificateDeleteDialogClose(event) {
    this.displayAppUserCertificateDeleteDialog = event;
    this.getAppUserCertificates();
  }

  // --------- App User Contact --------------
  getAppUserContact() {
    this.appUserContactSrv.apiUrl = environment.app_user.contact.byAppUserId;
    this.appUserContactAllSubscription = this.appUserContactSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserContact>) => {
      this.appUserContacts = items;
    });
  }

  showAppUserContactAddDialog() {
    this.displayAppUserContactAddDialog = true;
  }

  onAppUserContactAddDialogClose(event) {
    this.displayAppUserContactAddDialog = event;
    this.getAppUserContact();
  }

  showAppUserContactDeleteDialog(appUserContactID) {
    this.displayAppUserContactDeleteDialog = true;
    this.appUserContactSrv.apiUrl = environment.app_user.contact.root;
    this.appUserContactOneSubscription =  this.appUserContactSrv.getSingle(appUserContactID)
    .subscribe((item: AppUserContact) => {
      this.selectedAppUserContact = item;
    });
  }

  onAppUserContactDeleteDialogClose(event) {
    this.displayAppUserContactDeleteDialog = event;
    this.getAppUserContact();
  }

  // --------- App User Contract --------------
  getAppUserContract() {
    this.appUserContractSrv.apiUrl = environment.app_user.contract.byAppUserId;
    this.appUserContractAllSubscription = this.appUserContractSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserContract>) => {
      this.appUserContracts = items;
    });
  }

  showAppUserContractAddDialog() {
    this.displayAppUserContractAddDialog = true;
  }

  onAppUserContractAddDialogClose(event) {
    this.displayAppUserContractAddDialog = event;
    this.getAppUserContract();
  }

  showAppUserContractDeleteDialog(appUserContractID) {
    this.displayAppUserContractDeleteDialog = true;
    this.appUserContractSrv.apiUrl = environment.app_user.contract.root;
    this.appUserContractOneSubscription =  this.appUserContractSrv.getSingle(appUserContractID)
    .subscribe((item: AppUserContract) => {
      this.selectedAppUserContract = item;
    });
  }

  onAppUserContractDeleteDialogClose(event) {
    this.displayAppUserContractDeleteDialog = event;
    this.getAppUserContract();
  }


  // --------- App User Country --------------
  getAppUserCountries() {
    this.appUserCountrySrv.apiUrl = environment.app_user.country.byAppUserId;
    this.appUserCountryAllSubscription = this.appUserCountrySrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserCountry>) => {
      this.appUserCountries = items;
    });
  }

  showAppUserCountryAddDialog() {
    this.displayAppUserCountryAddDialog = true;
  }

  onAppUserCountryAddDialogClose(event) {
    this.displayAppUserCountryAddDialog = event;
    this.getAppUserCountries();
  }

  showAppUserCountryDeleteDialog(appUserCountryID) {
    this.displayAppUserCountryDeleteDialog = true;
    this.appUserCountrySrv.apiUrl = environment.app_user.country.root;
    this.appUserCountryOneSubscription =  this.appUserCountrySrv.getSingle(appUserCountryID)
    .subscribe((item: AppUserCountry) => {
      this.selectedAppUserCountry = item;
    });
  }

  onAppUserCountryDeleteDialogClose(event) {
    this.displayAppUserCountryDeleteDialog = event;
    this.getAppUserCountries();
  }

  // --------- App User Education --------------
  getAppUserEducation() {
    this.appUserEducationSrv.apiUrl = environment.app_user.education.byAppUserId;
    this.appUserEducationAllSubscription = this.appUserEducationSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserEducation>) => {
      this.appUserEducations = items;
    });
  }

  showAppUserEducationAddDialog() {
    this.displayAppUserEducationAddDialog = true;
  }

  onAppUserEducationAddDialogClose(event) {
    this.displayAppUserEducationAddDialog = event;
    this.getAppUserEducation();
  }

  showAppUserEducationDeleteDialog(appUserEducationID) {
    this.displayAppUserEducationDeleteDialog = true;
    this.appUserEducationSrv.apiUrl = environment.app_user.education.root;
    this.appUserEducationOneSubscription =  this.appUserEducationSrv.getSingle(appUserEducationID)
    .subscribe((item: AppUserEducation) => {
      this.selectedAppUserEducation = item;
    });
  }

  onAppUserEducationDeleteDialogClose(event) {
    this.displayAppUserEducationDeleteDialog = event;
    this.getAppUserEducation();
  }

  // --------- App User Employment Record --------------
  getAppUserEmploymentRecords() {
    this.appUserEmploymentRecordSrv.apiUrl = environment.app_user.employment_record.byAppUserId;
    this.appUserEmploymentRecordAllSubscription = this.appUserEmploymentRecordSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserEmploymentRecord>) => {
      this.appUserEmploymentRecords = items;
    });
  }

  showAppUserEmploymentRecordAddDialog() {
    this.displayAppUserEmploymentRecordAddDialog = true;
  }

  onAppUserEmploymentRecordAddDialogClose(event) {
    this.displayAppUserEmploymentRecordAddDialog = event;
    this.getAppUserEmploymentRecords();
  }

  showAppUserEmploymentRecordDeleteDialog(appUserEmploymentRecordID) {
    this.displayAppUserEmploymentRecordDeleteDialog = true;
    this.appUserEmploymentRecordSrv.apiUrl = environment.app_user.employment_record.root;
    this.appUserEmploymentRecordOneSubscription =  this.appUserEmploymentRecordSrv.getSingle(appUserEmploymentRecordID)
    .subscribe((item: AppUserEmploymentRecord) => {
      this.selectedAppUserEmploymentRecord = item;
    });
  }

  onAppUserEmploymentRecordDeleteDialogClose(event) {
    this.displayAppUserEmploymentRecordDeleteDialog = event;
    this.getAppUserEmploymentRecords();
  }

  // --------- App User Function --------------
  getAppUserFunctions() {
    this.appUserFunctionSrv.apiUrl = environment.app_user.function.byAppUserId;
    this.appUserFunctionAllSubscription = this.appUserFunctionSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserFunction>) => {
      this.appUserFunctions = items;
    });
  }

  showAppUserFunctionAddDialog() {
    this.displayAppUserFunctionAddDialog = true;
  }

  onAppUserFunctionAddDialogClose(event) {
    this.displayAppUserFunctionAddDialog = event;
    this.getAppUserFunctions();
  }

  showAppUserFunctionDeleteDialog(appUserFunctionID) {
    this.displayAppUserFunctionDeleteDialog = true;
    this.appUserFunctionSrv.apiUrl = environment.app_user.function.root;
    this.appUserFunctionOneSubscription =  this.appUserFunctionSrv.getSingle(appUserFunctionID)
    .subscribe((item: AppUserFunction) => {
      this.selectedAppUserFunction = item;
    });
  }

  onAppUserFunctionDeleteDialogClose(event) {
    this.displayAppUserFunctionDeleteDialog = event;
    this.getAppUserFunctions();
  }

  // --------- App User In Role --------------

  getAppUserInRole() {
    this.appUserInRoleSrv.apiUrl = environment.app_user.role.byAppUserId;
    this.appUserInRoleAllSubscription = this.appUserInRoleSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserInRole>) => {
      this.appUserInRoles = items;
      console.log(this.appUserInRoles);
    });
  }

  showAppUserInRoleAddDialog() {
    this.displayAppUserInRoleAddDialog = true;
  }

  onAppUserInRoleAddDialogClose(event) {
    this.displayAppUserInRoleAddDialog = event;
    this.getAppUserInRole();
  }

  showAppUserInRoleDeleteDialog(appUserInRoleID) {
    this.displayAppUserInRoleDeleteDialog = true;
    this.appUserInRoleSrv.apiUrl = environment.app_user.role.root;
    this.appUserInRoleOneSubscription =  this.appUserInRoleSrv.getSingle(appUserInRoleID)
    .subscribe((item: AppUserInRole) => {
      this.selectedAppUserInRole = item;
      console.log(this.selectedAppUserInRole);
    });
  }

  onAppUserInRoleDeleteDialogClose(event) {
    this.displayAppUserInRoleDeleteDialog = event;
    this.getAppUserInRole();
  }

   // --------- App User Language --------------
  getAppUserLanguages() {
    this.appUserLanguageSrv.apiUrl = environment.app_user.language.byAppUserId;
    this.appUserLanguageAllSubscription = this.appUserLanguageSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserLanguage>) => {
      this.appUserLanguages = items;
    });
  }

  showAppUserLanguageAddDialog() {
    this.displayAppUserLanguageAddDialog = true;
  }

  onAppUserLanguageAddDialogClose(event) {
    this.displayAppUserLanguageAddDialog = event;
    this.getAppUserLanguages();
  }

  showAppUserLanguageDeleteDialog(appUserLanguageID) {
    this.displayAppUserLanguageDeleteDialog = true;
    this.appUserLanguageSrv.apiUrl = environment.app_user.language.root;
    this.appUserLanguageOneSubscription =  this.appUserLanguageSrv.getSingle(appUserLanguageID)
    .subscribe((item: AppUserLanguage) => {
      this.selectedAppUserLanguage = item;
    });
  }

  onAppUserLanguageDeleteDialogClose(event) {
    this.displayAppUserLanguageDeleteDialog = event;
    this.getAppUserLanguages();
  }

   // --------- App User Notes --------------
  getAppUserNotes() {
    this.appUserNoteSrv.apiUrl = environment.app_user.note.byAppUserId;
    this.appUserNoteAllSubscription = this.appUserNoteSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserNote>) => {
      this.appUserNotes = items;
    });
  }

  showAppUserNoteAddDialog() {
    this.displayAppUserNoteAddDialog = true;
  }

  onAppUserNoteAddDialogClose(event) {
    this.displayAppUserNoteAddDialog = event;
    this.getAppUserNotes();
  }

  showAppUserNoteDeleteDialog(appUserNoteID) {
    this.displayAppUserNoteDeleteDialog = true;
    this.appUserNoteSrv.apiUrl = environment.app_user.note.root;
    this.appUserNoteOneSubscription =  this.appUserNoteSrv.getSingle(appUserNoteID)
    .subscribe((item: AppUserNote) => {
      this.selectedAppUserNote = item;
    });
  }

  onAppUserNoteDeleteDialogClose(event) {
    this.displayAppUserNoteDeleteDialog = event;
    this.getAppUserNotes();
  }

   // --------- App User Research Team --------------
  getAppUserResearchTeams() {
    this.appUserResearchTeamSrv.apiUrl = environment.app_user.research_team.byAppUserId;
    this.appUserResearchTeamAllSubscription = this.appUserResearchTeamSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserResearchTeam>) => {
      this.appUserResearchTeams = items;
    });
  }

  showAppUserResearchTeamAddDialog() {
    this.displayAppUserResearchTeamAddDialog = true;
  }

  onAppUserResearchTeamAddDialogClose(event) {
    this.displayAppUserResearchTeamAddDialog = event;
    this.getAppUserResearchTeams();
  }

  showAppUserResearchTeamDeleteDialog(appUserResearchTeamID) {
    this.displayAppUserResearchTeamDeleteDialog = true;
    this.appUserResearchTeamSrv.apiUrl = environment.app_user.research_team.root;
    this.appUserResearchTeamOneSubscription =  this.appUserResearchTeamSrv.getSingle(appUserResearchTeamID)
    .subscribe((item: AppUserResearchTeam) => {
      this.selectedAppUserResearchTeam = item;
    });
  }

  onAppUserResearchTeamDeleteDialogClose(event) {
    this.displayAppUserResearchTeamDeleteDialog = event;
    this.getAppUserTeamAssignments();
  }

    // --------- App User Team Assignment--------------
  getAppUserTeamAssignments() {
    this.appUserTeamAssignmentSrv.apiUrl = environment.app_user.team_assignment.byAppUserId;
    this.appUserTeamAssignmentAllSubscription = this.appUserTeamAssignmentSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserTeamAssignment>) => {
      this.appUserTeamAssignments = items;
    });
  }

  showAppUserTeamAssignmentsAddDialog() {
    this.displayAppUserTeamAssignmentAddDialog = true;
  }

  onAppUserTeamAssignmentsAddDialogClose(event) {
    this.displayAppUserTeamAssignmentAddDialog = event;
    this.getAppUserTeamAssignments();
  }

  showAppUserTeamAssignmentsDeleteDialog(appUserTeamAssignmentID) {
    this.displayAppUserTeamAssignmentDeleteDialog = true;
    this.appUserTeamAssignmentSrv.apiUrl = environment.app_user.team_assignment.root;
    this.appUserTeamAssignmentOneSubscription =  this.appUserTeamAssignmentSrv.getSingle(appUserTeamAssignmentID)
    .subscribe((item: AppUserTeamAssignment) => {
      this.selectedAppUserTeamAssignment = item;
    });
  }

  onAppUserTeamAssignmentsDeleteDialogClose(event) {
    this.displayAppUserTeamAssignmentDeleteDialog = event;
    this.getAppUserTeamAssignments();
  }

  // --------- App User Team--------------
  getAppUserTeams() {
    this.appUserTeamSrv.apiUrl = environment.app_user.team.byAppUserId;
    this.appUserTeamAllSubscription = this.appUserTeamSrv.getByAppUserId(this.selectedAppUserID)
    .subscribe((items: Array<AppUserTeam>) => {
      this.appUserTeams = items;
    });
  }

  showAppUserTeamAddDialog() {
    this.displayAppUserTeamAddDialog = true;
  }

  onAppUserTeamAddDialogClose(event) {
    this.displayAppUserTeamAddDialog = event;
    this.getAppUserTeams();
  }

  showAppUserTeamDeleteDialog(appUseTeamID) {
    this.displayAppUserTeamDeleteDialog = true;
    this.appUserTeamSrv.apiUrl = environment.app_user.team.root;
    this.appUserTeamOneSubscription =  this.appUserTeamSrv.getSingle(appUseTeamID)
    .subscribe((item: AppUserTeam) => {
      this.selectedAppUserTeam = item;
    });
  }

  onAppUserTeamDeleteDialogClose(event) {
    this.displayAppUserTeamDeleteDialog = event;
    this.getAppUserTeams();
  }

  onBack() {
    this.router.navigate(['/user-management']);
  }

  ngOnDestroy(): void {
    if (this.appUserAbsenceAllSubscription) { this.appUserAbsenceAllSubscription.unsubscribe(); }
    if (this.appUserAbsenceOneSubscription) { this.appUserAbsenceOneSubscription.unsubscribe(); }
    if (this.appUserAddressAllSubscription) { this.appUserAddressAllSubscription.unsubscribe(); }
    if (this.appUserAddressOneSubscription) { this.appUserAddressOneSubscription.unsubscribe(); }
    if (this.appUserCertificateAllSubscription) { this.appUserCertificateAllSubscription.unsubscribe(); }
    if (this.appUserCertificateOneSubscription) { this.appUserCertificateOneSubscription.unsubscribe(); }
    if (this.appUserContactAllSubscription) { this.appUserContactAllSubscription.unsubscribe(); }
    if (this.appUserContactOneSubscription) { this.appUserContactOneSubscription.unsubscribe(); }
    if (this.appUserContractAllSubscription) { this.appUserContractAllSubscription.unsubscribe(); }
    if (this.appUserContractOneSubscription) { this.appUserContractOneSubscription.unsubscribe(); }
    if (this.appUserCountryAllSubscription) { this.appUserCountryAllSubscription.unsubscribe(); }
    if (this.appUserCountryOneSubscription) { this.appUserCountryOneSubscription.unsubscribe(); }
    if (this.appUserEducationAllSubscription) { this.appUserEducationAllSubscription.unsubscribe(); }
    if (this.appUserEducationOneSubscription) { this.appUserEducationOneSubscription.unsubscribe(); }
    if (this.appUserEmploymentRecordAllSubscription) { this.appUserEmploymentRecordAllSubscription.unsubscribe(); }
    if (this.appUserEmploymentRecordOneSubscription) { this.appUserEmploymentRecordOneSubscription.unsubscribe(); }
    if (this.appUserFunctionAllSubscription) { this.appUserFunctionAllSubscription.unsubscribe(); }
    if (this.appUserFunctionOneSubscription) { this.appUserFunctionOneSubscription.unsubscribe(); }
    if (this.appUserInRoleAllSubscription) { this.appUserInRoleAllSubscription.unsubscribe(); }
    if (this.appUserInRoleOneSubscription) { this.appUserInRoleOneSubscription.unsubscribe(); }
    if (this.appUserLanguageAllSubscription) { this.appUserLanguageAllSubscription.unsubscribe(); }
    if (this.appUserLanguageOneSubscription) { this.appUserLanguageOneSubscription.unsubscribe(); }
    if (this.appUserNoteAllSubscription) { this.appUserNoteAllSubscription.unsubscribe(); }
    if (this.appUserNoteOneSubscription) { this.appUserNoteOneSubscription.unsubscribe(); }
    if (this.appUserResearchTeamAllSubscription) { this.appUserResearchTeamAllSubscription.unsubscribe(); }
    if (this.appUserResearchTeamOneSubscription) { this.appUserResearchTeamOneSubscription.unsubscribe(); }
    if (this.appUserTeamAssignmentAllSubscription) { this.appUserTeamAssignmentAllSubscription.unsubscribe(); }
    if (this.appUserTeamAssignmentOneSubscription) { this.appUserTeamAssignmentOneSubscription.unsubscribe(); }
    if (this.appUserTeamAllSubscription) { this.appUserTeamAllSubscription.unsubscribe(); }
    if (this.appUserTeamOneSubscription) { this.appUserTeamOneSubscription.unsubscribe(); }
  }
}
