import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';
import { AppUserLanguage } from 'src/app/shared/models/admin/app_user/app-user-language.model';
import { Subscription } from 'rxjs';
import { LanguageType } from 'src/app/shared/models/admin/types/language-type.model';
import { ProficiencyType } from 'src/app/shared/models/admin/types/proficiency-type.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserLanguageService } from 'src/app/shared/services/admin/app_user/app-user-language.service';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { ProficiencyTypeService } from 'src/app/shared/services/admin/types/proficiency-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-language-add-dialog',
  templateUrl: './app-user-language-add-dialog.component.html',
  styleUrls: ['./app-user-language-add-dialog.component.css']
})
export class AppUserLanguageAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserLanguage: AppUserLanguage;

  appUserLanguageAddSubscription: Subscription;
  languageTypeAllSubscription: Subscription;
  proficiencyTypeAllSubscription: Subscription;

  languageTypes: LanguageType[];
  proficiencyTypes: ProficiencyType[];

  isSubmitted = false;

  appUserLanguageForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.appUserLanguageForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserLanguageSrv: AppUserLanguageService,
              private languageTypeSrv: LanguageTypeService,
              private proficiencyTypeSrv: ProficiencyTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getLanguageTypes();
    this.getProficiencyTypes();
  }

  ngOnChanges() {
    this.appUserLanguageForm = new FormGroup ({
      'languageType' : new FormControl('', Validators.required),
      'proficiencyType' : new FormControl('', Validators.required),
      'isMonitored' : new FormControl(false, Validators.required)
    });
  }

  getLanguageTypes() {
    this.languageTypeSrv.apiUrl = environment.languageType.root;
    this.languageTypeAllSubscription = this.languageTypeSrv.getAll().subscribe((items: Array<LanguageType>) => {
        this.languageTypes = items;
    });
  }

  getProficiencyTypes() {
    this.proficiencyTypeSrv.apiUrl = environment.proficiencyType.root;
    this.proficiencyTypeAllSubscription = this.proficiencyTypeSrv.getAll().subscribe((items: Array<ProficiencyType>) => {
        this.proficiencyTypes = items;
    });
  }

  onSave(appUserLanguageForm) {
    this.isSubmitted = true;

    if (appUserLanguageForm.valid) {
      this.appUserLanguage = appUserLanguageForm.value;
      this.appUserLanguage.appUserID = this.selectedAppUser.appUserID;
      this.appUserLanguage.languageTypeID = this.appUserLanguage.languageType.languageTypeID;
      this.appUserLanguage.proficiencyTypeID = this.appUserLanguage.proficiencyType.proficiencyTypeID;
      this.appUserLanguage.createdBy = this.globalHelperSrv.getCurrentUser();
      this.appUserLanguage.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.appUserLanguage.dateCreatedUTC = new Date().toUTCString();
      this.appUserLanguage.lastUpdatedUTC = new Date().toUTCString();
      this.appUserLanguage.languageType = null;
      this.appUserLanguage.proficiencyType = null;

      this.appUserLanguageSrv.apiUrl = environment.app_user.language.root;
      this.appUserLanguageAddSubscription = this.appUserLanguageSrv.post(this.appUserLanguage).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User Language successfully created.' });

      this.appUserLanguage = new AppUserLanguage();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.displayChange.emit(false);
    this.appUserLanguageForm.reset();
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserLanguageAddSubscription) { this.appUserLanguageAddSubscription.unsubscribe(); }
    if (this.languageTypeAllSubscription) { this.languageTypeAllSubscription.unsubscribe(); }
    if (this.proficiencyTypeAllSubscription) { this.proficiencyTypeAllSubscription.unsubscribe(); }
  }

}
