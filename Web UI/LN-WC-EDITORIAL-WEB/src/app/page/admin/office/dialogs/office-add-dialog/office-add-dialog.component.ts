import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { Office } from '../../../../../shared/models/admin/office.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { OfficeService } from '../../../../../shared/services/admin/office.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';
import { CountryService } from '../../../../../shared/services/admin/country.service';
import { Country } from '../../../../../shared/models/admin/country.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-office-add-dialog',
  templateUrl: './office-add-dialog.component.html',
  styleUrls: ['./office-add-dialog.component.css']
})
export class OfficeAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  office: Office;
  officeAddSubscription: Subscription;
  countryAllSubscription: Subscription;
  countries: Country[];

  isSubmitted = false;

  errorMessage: string;

  officeForm: FormGroup;

  // convenience getter for easy access to form fields
  get f() { return this.officeForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private officeSrv: OfficeService,
              private countrySrv: CountryService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getCountries();
  }

  ngOnChanges() {
    this.officeForm = new FormGroup ({
      'officeName' : new FormControl('', Validators.required),
      'company' : new FormControl('', Validators.required),
      'city' : new FormControl('', Validators.required),
      'country' : new FormControl('', Validators.required),
      'isSales' : new FormControl(false, Validators.required),
      'isResearch' : new FormControl(false, Validators.required),
      'isSupport' : new FormControl(false, Validators.required),
      'isMarketing' : new FormControl(false, Validators.required),
      'isActive' : new FormControl(false, Validators.required)
    });
  }

  getCountries() {
    this.countrySrv.apiUrl = environment.country.root;
    this.countryAllSubscription = this.countrySrv.getAll().subscribe((items: Array<Country>) => {
      this.countries = items;
    });
  }

  onSave(officeForm) {
    this.isSubmitted = true;

    if (officeForm.valid) {
      this.office = officeForm.value;
      this.office.countryID = this.office.country.countryID;
      this.office.createdBy = this.globalHelperSrv.getCurrentUser();
      this.office.updatedBy = this.globalHelperSrv.getCurrentUser();
      this.office.dateCreatedUTC = new Date().toUTCString();
      this.office.lastUpdatedUTC = new Date().toUTCString();
      this.office.country = null;
      console.log(this.officeForm);
      this.officeSrv.apiUrl = environment.office.root;
      this.officeAddSubscription = this.officeSrv.post(this.office).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: this.office.officeName + ' successfully created.' });

        this.office = new Office();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.officeForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.officeAddSubscription) { this.officeAddSubscription.unsubscribe(); }
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
  }

}
