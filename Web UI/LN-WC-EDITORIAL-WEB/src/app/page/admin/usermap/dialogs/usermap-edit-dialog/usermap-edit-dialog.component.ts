import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { UserMap } from 'src/app/shared/models/admin/user-map.model';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { UserMapService } from 'src/app/shared/services/admin/user-map.service';
import { MessageService } from 'primeng/api';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usermap-edit-dialog',
  templateUrl: './usermap-edit-dialog.component.html',
  styleUrls: ['./usermap-edit-dialog.component.css']
})
export class UsermapEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedUserMap: UserMap;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  userMapEditSubscription: Subscription;
  appUserAllSubscription: Subscription;

  appUsers: AppUser[];

  userMapForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.userMapForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private userMapSrv: UserMapService,
              private messageService: MessageService,
              private appUserSrv: AppUserService) { }

  ngOnInit() {
    this.getAppUsers();
  }

  ngOnChanges(): void {
    if (this.selectedUserMap) {
      this.generateForm();
      this.userMapForm.setValue({
          appUser: this.selectedUserMap.appUser,
          humanReviewUserID: this.selectedUserMap.humanReviewUserID,
      });
    }
  }

  generateForm() {
    this.userMapForm = new FormGroup ({
      'appUser' : new FormControl('', Validators.required),
      'humanReviewUserID' : new FormControl('', Validators.required)
    });
  }

  getAppUsers() {
    this.appUserSrv.apiUrl = environment.app_user.noref;
    this.appUserAllSubscription = this.appUserSrv.getAll().subscribe((items: Array<AppUser>) => {
        this.appUsers = items;
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const userMap = new UserMap();
      userMap.hrEditorialUserMapID = this.selectedUserMap.hrEditorialUserMapID;
      userMap.appUserID = <number>this.userMapForm.get('appUser').value.appUserID;
      userMap.humanReviewUserID = <string>this.userMapForm.get('humanReviewUserID').value;
      userMap.createdBy = this.selectedUserMap.createdBy;
      userMap.dateCreatedUTC = this.selectedUserMap.dateCreatedUTC;
      userMap.updatedBy = this.globalHelperSrv.getCurrentUser();
      userMap.lastUpdatedUTC = new Date().toUTCString();

      this.userMapSrv.apiUrl = environment.user_map.root;
      this.userMapEditSubscription = this.userMapSrv.put(userMap).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User map successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.userMapForm.reset();
    this.displayChange.emit(false);
    this.selectedUserMap = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.userMapEditSubscription) { this.userMapEditSubscription.unsubscribe(); }
    if (this.appUserAllSubscription) { this.appUserAllSubscription.unsubscribe(); }
  }

}
