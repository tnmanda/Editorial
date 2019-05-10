import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';
import { AppUserEducation } from 'src/app/shared/models/admin/app_user/app-user-education.model';
import { EducationType } from 'src/app/shared/models/admin/types/education-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserEducationService } from 'src/app/shared/services/admin/app_user/app-user-education.service';
import { EducationTypeService } from 'src/app/shared/services/admin/types/education-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-app-user-education-add-dialog',
  templateUrl: './app-user-education-add-dialog.component.html',
  styleUrls: ['./app-user-education-add-dialog.component.css']
})
export class AppUserEducationAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserEducation: AppUserEducation;

  appUserEducationAddSubscription: Subscription;
  educationTypeAllSubscription: Subscription;

  educationTypes: EducationType[];

  isSubmitted = false;

  appUserEducationForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.appUserEducationForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserEducationSrv: AppUserEducationService,
              private educationTypeSrv: EducationTypeService,
              private messageService: MessageService) { }

  ngOnInit() {

  this.appUserEducationForm = new FormGroup ({
  'educationType' : new FormControl('', Validators.required)
  });

  this.appUserEducation = new AppUserEducation();
  this.getEducationTypes();
  }

  getEducationTypes() {
    this.educationTypeSrv.apiUrl = environment.educationType.root;
    this.educationTypeAllSubscription = this.educationTypeSrv.getAll().subscribe((items: Array<EducationType>) => {
        this.educationTypes = items;
    });
  }

  onSave(appUserEducationForm) {
    this.isSubmitted = true;

    if (appUserEducationForm.valid) {
      this.appUserEducation = appUserEducationForm.value;
      this.appUserEducation.appUserID = this.selectedAppUser.appUserID;
      this.appUserEducation.educationTypeID = this.appUserEducation.educationType.educationTypeID;
      this.appUserEducation.createdBy = this.globalHelperSrv.getCurrentUser();
      this.appUserEducation.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.appUserEducation.dateCreatedUTC = new Date().toUTCString();
      this.appUserEducation.lastUpdatedUTC = new Date().toUTCString();
      this.appUserEducation.educationType = null;
      console.log(this.appUserEducation);
      this.appUserEducationSrv.apiUrl = environment.app_user.education.root;
      this.appUserEducationAddSubscription = this.appUserEducationSrv.post(this.appUserEducation).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User Education successfully created.' });

      this.appUserEducation = new AppUserEducation();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.appUserEducationForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserEducationAddSubscription) { this.appUserEducationAddSubscription.unsubscribe(); }
    if (this.educationTypeAllSubscription) { this.educationTypeAllSubscription.unsubscribe(); }
  }

}
