import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FunctionType } from '../../../../../../shared/models/admin/types/function-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { FunctionTypeService } from '../../../../../../shared/services/admin/types/function-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-function-type-add-dialog',
  templateUrl: './function-type-add-dialog.component.html',
  styleUrls: ['./function-type-add-dialog.component.css']
})
export class FunctionTypeAddDialogComponent implements OnInit, OnDestroy {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  functionType: FunctionType;
  functionTypeAddSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private functionTypeSrv: FunctionTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  this.functionType = new FunctionType();
  }

  onSave() {
  this.functionType.createdBy = this.globalHelperSrv.getCurrentUser();
  this.functionType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.functionType.dateCreatedUTC = new Date().toUTCString();
  this.functionType.lastUpdatedUTC = new Date().toUTCString();

  this.functionTypeSrv.apiUrl = environment.functionType.root;
  this.functionTypeAddSubscription = this.functionTypeSrv.post(this.functionType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.functionType.functionTypeName + ' successfully created.' });

  this.functionType = new FunctionType();
  }, error => { this.errorMessage = error; });
  }

  onClose() {
  this.displayChange.emit(false);
  this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    if (this.functionTypeAddSubscription) { this.functionTypeAddSubscription.unsubscribe(); }
  }

}
