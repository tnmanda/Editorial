import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { Office } from '../../../../../shared/models/admin/office.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../shared/helpers/global-helper.service';
import { OfficeService } from '../../../../../shared/services/admin/office.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';
import { CountryService } from '../../../../../shared/services/admin/country.service';
import { Country } from '../../../../../shared/models/admin/country.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-office-edit-dialog',
  templateUrl: './office-edit-dialog.component.html',
  styleUrls: ['./office-edit-dialog.component.css']
})
export class OfficeEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedOffice: Office;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  officeEditSubscription: Subscription;
  countryAllSubscription: Subscription;

  countries: Country[];

  officeForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.officeForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private officeSrv: OfficeService,
              private messageService: MessageService,
              private countrySrv: CountryService) { }

  ngOnInit() {
    this.getCountries();
  }

  ngOnChanges(): void {
    if (this.selectedOffice) {
      this.generateForm();
      this.officeForm.setValue({
          officeName: this.selectedOffice.officeName,
          company: this.selectedOffice.company,
          city: this.selectedOffice.city,
          country: this.selectedOffice.country,
          isSales: this.selectedOffice.isSales,
          isResearch: this.selectedOffice.isResearch,
          isSupport: this.selectedOffice.isSupport,
          isMarketing: this.selectedOffice.isMarketing,
          isActive: this.selectedOffice.isActive
      });
    }
  }

  generateForm() {
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

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const office = new Office();
      office.officeID = this.selectedOffice.officeID;
      office.officeName = <string>this.officeForm.get('officeName').value;
      office.company = <string>this.officeForm.get('company').value;
      office.city = <string>this.officeForm.get('city').value;
      office.countryID = <number>this.officeForm.get('country').value.countryID;
      office.isSales = <boolean>this.officeForm.get('isSales').value;
      office.isResearch = <boolean>this.officeForm.get('isResearch').value;
      office.isSupport = <boolean>this.officeForm.get('isSupport').value;
      office.isMarketing = <boolean>this.officeForm.get('isMarketing').value;
      office.isActive = <boolean>this.officeForm.get('isActive').value;
      office.createdBy = this.selectedOffice.createdBy;
      office.dateCreatedUTC = this.selectedOffice.dateCreatedUTC;
      office.updatedBy = this.globalHelperSrv.getCurrentUser();
      office.lastUpdatedUTC = new Date().toUTCString();

      this.officeSrv.apiUrl = environment.office.root;
      this.officeEditSubscription = this.officeSrv.put(office).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: this.selectedOffice.officeName + ' successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.officeForm.reset();
    this.displayChange.emit(false);
    this.selectedOffice = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.officeEditSubscription) { this.officeEditSubscription.unsubscribe(); }
    if (this.countryAllSubscription) { this.countryAllSubscription.unsubscribe(); }
  }

}
