import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AppUser } from '../../../../../../shared/models/admin/app-user.model';
import { AppUserContact } from '../../../../../../shared/models/admin/app_user/app-user-contact.model';
import { Subscription } from 'rxjs';
import { ContactType } from '../../../../../../shared/models/admin/types/contact-type.model';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AppUserContactService } from '../../../../../../shared/services/admin/app_user/app-user-contact.service';
import { ContactTypeService } from '../../../../../../shared/services/admin/types/contact-type.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-app-user-contact-add-dialog',
  templateUrl: './app-user-contact-add-dialog.component.html',
  styleUrls: ['./app-user-contact-add-dialog.component.css']
})
export class AppUserContactAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserContact: AppUserContact;

  appUserContactAddSubscription: Subscription;
  contactTypeAllSubscription: Subscription;

  contactTypes: ContactType[];

  isSubmitted = false;

  appUserContactForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.appUserContactForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserContactSrv: AppUserContactService,
              private contactTypeSrv: ContactTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.appUserContactForm = new FormGroup ({
      'contactType' : new FormControl('', Validators.required),
      'contactTypeValue' : new FormControl('', Validators.required)
    });

    this.getContactTypes();
  }

  getContactTypes() {
    this.contactTypeSrv.apiUrl = environment.contactType.root;
    this.contactTypeAllSubscription = this.contactTypeSrv.getAll().subscribe((items: Array<ContactType>) => {
        this.contactTypes = items;
    });
  }

  onSave(appUserContactForm) {
    this.isSubmitted = true;

    if (appUserContactForm.valid) {
      console.log(appUserContactForm);
      this.appUserContact = appUserContactForm.value;
      this.appUserContact.appUserID = this.selectedAppUser.appUserID;
      this.appUserContact.contactTypeID = this.appUserContact.contactType.contactTypeID;
      this.appUserContact.contactTypeValue = this.appUserContact.contactTypeValue;
      this.appUserContact.createdBy = this.globalHelperSrv.getCurrentUser();
      this.appUserContact.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.appUserContact.dateCreatedUTC = new Date().toUTCString();
      this.appUserContact.lastUpdatedUTC = new Date().toUTCString();
      this.appUserContact.contactType = null;

      this.appUserContactSrv.apiUrl = environment.app_user.contact.root;
      this.appUserContactAddSubscription = this.appUserContactSrv.post(this.appUserContact).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User Contact successfully created.' });

      this.appUserContact = new AppUserContact();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.displayChange.emit(false);
    this.appUserContactForm.reset();
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.contactTypeAllSubscription) { this.contactTypeAllSubscription.unsubscribe(); }
    if (this.appUserContactAddSubscription) { this.appUserContactAddSubscription.unsubscribe(); }
  }

}
