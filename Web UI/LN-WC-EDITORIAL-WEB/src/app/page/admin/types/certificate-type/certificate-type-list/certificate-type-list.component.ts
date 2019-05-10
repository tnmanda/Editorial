import { Component, OnInit, OnDestroy } from '@angular/core';
import { CertificateType } from '../../../../../shared/models/admin/types/certificate-type.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { CertificateTypeService } from '../../../../../shared/services/admin/types/certificate-type.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-certificate-type-list',
  templateUrl: './certificate-type-list.component.html',
  styleUrls: ['./certificate-type-list.component.css'],
  providers: [MessageService]
})
export class CertificateTypeListComponent implements OnInit, OnDestroy {

  selectedCertificateType: CertificateType;
  certificateTypeAllSubscription: Subscription;
  certificateTypeOneSubscription: Subscription;

  certificateTypes: CertificateType[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private certificateTypeSrv: CertificateTypeService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'Certificate'},
    ];

    this.home = {icon: 'fa fa-home'};

    this.getCertificateTypes();
  }

  getCertificateTypes() {
    this.certificateTypeSrv.apiUrl = environment.certificateType.root;
    this.certificateTypeAllSubscription = this.certificateTypeSrv.getAll().subscribe((items: Array<CertificateType>) => {
        this.certificateTypes = items;
    });
  }

  getCertificateTypeByID(certificateTypeID: number) {
    this.certificateTypeSrv.apiUrl = environment.certificateType.root;
    this.certificateTypeOneSubscription =  this.certificateTypeSrv.getSingle(certificateTypeID.toString())
    .subscribe((item: CertificateType) => {
      this.selectedCertificateType = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getCertificateTypes();
  }

  showEditDialog(certificateTypeID) {
    this.getCertificateTypeByID(certificateTypeID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getCertificateTypes();
  }

  showDeleteDialog(certificateTypeID) {
    this.getCertificateTypeByID(certificateTypeID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getCertificateTypes();
  }


  ngOnDestroy(): void {
    if (this.certificateTypeAllSubscription) { this.certificateTypeAllSubscription.unsubscribe(); }
    if (this.certificateTypeOneSubscription) { this.certificateTypeOneSubscription.unsubscribe(); }
  }

}
