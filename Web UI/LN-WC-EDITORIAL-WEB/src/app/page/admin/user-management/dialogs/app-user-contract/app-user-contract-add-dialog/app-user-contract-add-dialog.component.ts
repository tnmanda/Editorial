import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AppUser } from '../../../../../../shared/models/admin/app-user.model';
import { AppUserContract } from '../../../../../../shared/models/admin/app_user/app-user-contract.model';
import { Subscription } from 'rxjs';
import { ContractType } from '../../../../../../shared/models/admin/types/contract-type.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { AppUserContractService } from '../../../../../../shared/services/admin/app_user/app-user-contract.service';
import { ContractTypeService } from '../../../../../../shared/services/admin/types/contract-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-app-user-contract-add-dialog',
  templateUrl: './app-user-contract-add-dialog.component.html',
  styleUrls: ['./app-user-contract-add-dialog.component.css']
})
export class AppUserContractAddDialogComponent implements OnInit, OnDestroy {

  @Input() selectedAppUser: AppUser;

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  appUserContract: AppUserContract;

  appUserContractAddSubscription: Subscription;
  contractTypeAllSubscription: Subscription;

  contractTypes: ContractType[];

  isSubmitted = false;

  startDateUTC: Date;
  terminationDateUTC: Date;
  movedToProductionUTC: Date;

  appUserContractForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.appUserContractForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private appUserContractSrv: AppUserContractService,
              private contractTypeSrv: ContractTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.appUserContractForm = new FormGroup ({
      'contractType' : new FormControl('', Validators.required),
      'startDateUTC' : new FormControl('', Validators.required),
      'terminationDateUTC' : new FormControl('', Validators.required),
      'movedToProductionUTC' : new FormControl('', Validators.required)
    });

    this.getContractTypes();
  }

  getContractTypes() {
    this.contractTypeSrv.apiUrl = environment.contractType.root;
    this.contractTypeAllSubscription = this.contractTypeSrv.getAll().subscribe((items: Array<ContractType>) => {
        this.contractTypes = items;
    });
  }

  onSave(appUserContractForm) {
    this.isSubmitted = true;

    if (appUserContractForm.valid) {
      console.log(appUserContractForm);
      this.appUserContract = appUserContractForm.value;
      this.appUserContract.appUserID = this.selectedAppUser.appUserID;
      this.appUserContract.contractTypeID = this.appUserContract.contractType.contractTypeID;
      this.appUserContract.startDateUTC = this.globalHelperSrv.localToUtc(new Date(this.appUserContract.startDateUTC)).toUTCString();
      // tslint:disable-next-line:max-line-length
      this.appUserContract.terminationDateUTC = this.globalHelperSrv.localToUtc(new Date(this.appUserContract.terminationDateUTC)).toUTCString();
      // tslint:disable-next-line:max-line-length
      this.appUserContract.movedToProductionUTC = this.globalHelperSrv.localToUtc(new Date(this.appUserContract.movedToProductionUTC)).toUTCString();
      this.appUserContract.createdBy = this.globalHelperSrv.getCurrentUser();
      this.appUserContract.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.appUserContract.dateCreatedUTC = new Date().toUTCString();
      this.appUserContract.lastUpdatedUTC = new Date().toUTCString();
      this.appUserContract.contractType = null;
      console.log(this.appUserContract);
      this.appUserContractSrv.apiUrl = environment.app_user.contract.root;
      this.appUserContractAddSubscription = this.appUserContractSrv.post(this.appUserContract).subscribe(result => {
      this.onClose();

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User Contact successfully created.' });

      this.appUserContract = new AppUserContract();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.displayChange.emit(false);
    this.appUserContractForm.reset();
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.appUserContractAddSubscription) { this.appUserContractAddSubscription.unsubscribe(); }
    if (this.contractTypeAllSubscription) { this.contractTypeAllSubscription.unsubscribe(); }
  }


}
