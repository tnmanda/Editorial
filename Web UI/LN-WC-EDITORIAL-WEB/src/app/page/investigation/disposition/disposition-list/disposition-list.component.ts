import { Component, OnInit, OnDestroy } from '@angular/core';
import { Disposition } from 'src/app/shared/models/investigation/disposition.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { DispositionService } from 'src/app/shared/services/investigation/disposition.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-disposition-list',
  templateUrl: './disposition-list.component.html',
  styleUrls: ['./disposition-list.component.css'],
  providers: [MessageService]
})
export class DispositionListComponent implements OnInit, OnDestroy {

  selectedDisposition: Disposition;
  dispositionAllSubscription: Subscription;
  dispositionOneSubscription: Subscription;

  dispositions: Disposition[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private dispositionSrv: DispositionService) { }

  ngOnInit() {
    this.items = [
      {label: 'Investigation', url: 'investigation-entity-management'},
      {label: 'Disposition', url: 'disposition'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getDispositions();
  }

  getDispositions() {
    this.dispositionSrv.apiUrl = environment.investigation_management.disposition.root;
    this.dispositionAllSubscription = this.dispositionSrv.getAll().subscribe((items: Array<Disposition>) => {
        this.dispositions = items;
    });
  }

  getDispositionByID(dispositionID: number) {
    this.dispositionSrv.apiUrl = environment.investigation_management.disposition.root;
    this.dispositionOneSubscription = this.dispositionSrv.getSingle(dispositionID.toString()).subscribe((item: Disposition) => {
      this.selectedDisposition = item;
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getDispositions();
  }

  showEditDialog(investigationDispositionsID) {
    this.getDispositionByID(investigationDispositionsID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getDispositions();
  }

  showDeleteDialog(investigationDispositionsID) {
    this.getDispositionByID(investigationDispositionsID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getDispositions();
  }

  ngOnDestroy(): void {
    if (this.dispositionAllSubscription) { this.dispositionAllSubscription.unsubscribe(); }
    if (this.dispositionOneSubscription) { this.dispositionOneSubscription.unsubscribe(); }
  }


}
