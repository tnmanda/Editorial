import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';
import { Subscription } from 'rxjs';
import { AppUserFunction } from 'src/app/shared/models/admin/app_user/app-user-function.model';
import { FunctionType } from 'src/app/shared/models/admin/types/function-type.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { AppUserFunctionService } from 'src/app/shared/services/admin/app_user/app-user-function.service';
import { FunctionTypeService } from 'src/app/shared/services/admin/types/function-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-user-function-add-dialog',
  templateUrl: './app-user-function-add-dialog.component.html',
  styleUrls: ['./app-user-function-add-dialog.component.css']
})
export class AppUserFunctionAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserFunction: AppUserFunction;

  appUserFunctionAddSubscription: Subscription;
  functionTypeAllSubscription: Subscription;

  functionTypes: FunctionType[];

  isSubmitted = false;

  appUserFunctionForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.appUserFunctionForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserFunctionSrv: AppUserFunctionService,
              private functionTypeSrv: FunctionTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.appUserFunctionForm = new FormGroup ({
      'functionType' : new FormControl('', Validators.required),
    });

    this.getFunctionTypes();
  }

  getFunctionTypes() {
    this.functionTypeSrv.apiUrl = environment.functionType.root;
    this.functionTypeAllSubscription = this.functionTypeSrv.getAll().subscribe((items: Array<FunctionType>) => {
        this.functionTypes = items;
    });
  }

  onSave(appUserFunctionForm) {
    this.isSubmitted = true;

    if (appUserFunctionForm.valid) {
      this.appUserFunction = appUserFunctionForm.value;
      this.appUserFunction.appUserID = this.selectedAppUser.appUserID;
      this.appUserFunction.functionTypeID = this.appUserFunction.functionType.functionTypeID;
      this.appUserFunction.createdBy = this.globalHelperSrv.getCurrentUser();
      this.appUserFunction.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.appUserFunction.dateCreatedUTC = new Date().toUTCString();
      this.appUserFunction.lastUpdatedUTC = new Date().toUTCString();
      this.appUserFunction.functionType = null;

      this.appUserFunctionSrv.apiUrl = environment.app_user.function.root;
      this.appUserFunctionAddSubscription = this.appUserFunctionSrv.post(this.appUserFunction).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User Contact successfully created.' });

      this.appUserFunction = new AppUserFunction();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.displayChange.emit(false);
    this.appUserFunctionForm.reset();
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserFunctionAddSubscription) { this.appUserFunctionAddSubscription.unsubscribe(); }
    if (this.functionTypeAllSubscription) { this.functionTypeAllSubscription.unsubscribe(); }
  }


}
