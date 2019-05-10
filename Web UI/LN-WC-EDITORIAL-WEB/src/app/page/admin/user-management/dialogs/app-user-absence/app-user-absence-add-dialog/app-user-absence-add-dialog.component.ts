import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUserAbsence } from '../../../../../../shared/models/admin/app_user/app-user-absence.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AppUserAbsenceService } from '../../../../../../shared/services/admin/app_user/app-user-absence.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';
import { AbsenceTypeService } from '../../../../../../shared/services/admin/types/absence-type.service';
import { AbsenceType } from '../../../../../../shared/models/admin/types/absence-type.model';
import { AppUser } from '../../../../../../shared/models/admin/app-user.model';

@Component({
  selector: 'app-app-user-absence-add-dialog',
  templateUrl: './app-user-absence-add-dialog.component.html',
  styleUrls: ['./app-user-absence-add-dialog.component.css']
})
export class AppUserAbsenceAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserAbsence: AppUserAbsence;
  appUserAbsenceAddSubscription: Subscription;
  absenceTypeAllSubscription: Subscription;

  absenceTypes: AbsenceType[];

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserAbsenceSrv: AppUserAbsenceService,
              private absenceTypeSrv: AbsenceTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
  this.appUserAbsence = new AppUserAbsence();
  this.getAbsenceTypes();
  }

  getAbsenceTypes() {
    this.absenceTypeSrv.apiUrl = environment.absenceType.root;
    this.absenceTypeAllSubscription = this.absenceTypeSrv.getAll().subscribe((items: Array<AbsenceType>) => {
        this.absenceTypes = items;
    });
  }

  onSave() {
    this.appUserAbsence.appUserID = this.selectedAppUser.appUserID;
    this.appUserAbsence.absenceTypeID = this.appUserAbsence.absenceType.absenceTypeID;
    this.appUserAbsence.absenceTypeName = this.appUserAbsence.absenceType.absenceTypeName;
    this.appUserAbsence.createdBy = this.globalHelperSrv.getCurrentUser();
    this.appUserAbsence.updatedBy = this.globalHelperSrv.getCurrentUser();
    this.appUserAbsence.dateCreatedUTC = new Date().toUTCString();
    this.appUserAbsence.lastUpdatedUTC = new Date().toUTCString();
    this.appUserAbsence.absenceType = null;

    this.appUserAbsenceSrv.apiUrl = environment.app_user.absence.root;
    this.appUserAbsenceAddSubscription = this.appUserAbsenceSrv.post(this.appUserAbsence).subscribe(result => {
    this.onClose();

    // Post Message
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'Item ' + this.appUserAbsence.absenceTypeName + ' successfully created.' });

    this.appUserAbsence = new AppUserAbsence();
    }, error => { this.errorMessage = error; });
  }

  onClose() {
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserAbsenceAddSubscription) { this.appUserAbsenceAddSubscription.unsubscribe(); }
    if (this.absenceTypeAllSubscription) { this.absenceTypeAllSubscription.unsubscribe(); }
  }

}
