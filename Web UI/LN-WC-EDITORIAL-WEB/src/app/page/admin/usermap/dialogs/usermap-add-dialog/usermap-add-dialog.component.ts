import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { UserMap } from 'src/app/shared/models/admin/user-map.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { UserMapService } from 'src/app/shared/services/admin/user-map.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';

@Component({
  selector: 'app-usermap-add-dialog',
  templateUrl: './usermap-add-dialog.component.html',
  styleUrls: ['./usermap-add-dialog.component.css']
})
export class UsermapAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  userMap: UserMap;
  appUsers: AppUser[];

  userMapAddSubscription: Subscription;
  appUserAllSubscription: Subscription;

  isSubmitted = false;

  userMapForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.userMapForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private userMapSrv: UserMapService,
              private appUserSrv: AppUserService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getAppUsers();
  }

  ngOnChanges() {
    this.userMapForm = new FormGroup ({
      'appUser' : new FormControl('', Validators.required),
      'humanReviewUserID' : new FormControl('', Validators.required),
    });
  }

  getAppUsers() {
    this.appUserSrv.apiUrl = environment.app_user.detail;
    this.appUserAllSubscription = this.appUserSrv.getAll().subscribe((items: Array<AppUser>) => {
        this.appUsers = items;
    });
  }

  onSave(userMapForm) {
    this.isSubmitted = true;

    if (userMapForm.valid) {
      this.userMap = userMapForm.value;
      this.userMap.appUserID = this.userMap.appUser.appUserID;
      this.userMap.humanReviewUserID = this.userMap.humanReviewUserID;
      this.userMap.createdBy = this.globalHelperSrv.getCurrentUser();
      this.userMap.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.userMap.dateCreatedUTC = new Date().toUTCString();
      this.userMap.lastUpdatedUTC = new Date().toUTCString();
      this.userMap.appUser = null;
      this.userMapSrv.apiUrl = environment.user_map.root;
      this.userMapAddSubscription = this.userMapSrv.post(this.userMap).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'User map successfully created.' });

        this.userMap = new UserMap();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.userMapForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.userMapAddSubscription) { this.userMapAddSubscription.unsubscribe(); }
    if (this.appUserAllSubscription) { this.appUserAllSubscription.unsubscribe(); }
  }

}
