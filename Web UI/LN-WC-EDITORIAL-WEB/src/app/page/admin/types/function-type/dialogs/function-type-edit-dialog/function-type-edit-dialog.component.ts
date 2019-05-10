import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FunctionType } from '../../../../../../shared/models/admin/types/function-type.model';
import { Subscription } from 'rxjs';
import { GlobalHelperService } from '../../../../../../shared/helpers/global-helper.service';
import { FunctionTypeService } from '../../../../../../shared/services/admin/types/function-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-function-type-edit-dialog',
  templateUrl: './function-type-edit-dialog.component.html',
  styleUrls: ['./function-type-edit-dialog.component.css']
})
export class FunctionTypeEditDialogComponent implements OnInit, OnDestroy {

  @Input() selectedFunctionType: FunctionType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  functionTypeEditSubscription: Subscription;

  errorMessage: string;

  constructor(private globalHelperSrv: GlobalHelperService,
    private functionTypeSrv: FunctionTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.selectedFunctionType.updatedBy = this.globalHelperSrv.getCurrentUser();
  this.selectedFunctionType.lastUpdatedUTC = new Date().toUTCString();

  this.functionTypeSrv.apiUrl = environment.functionType.root;
  this.functionTypeEditSubscription = this.functionTypeSrv.put(this.selectedFunctionType).subscribe(result => {
  this.onClose();

  // Post Message
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedFunctionType.functionTypeName + ' successfully updated.' });

  this.selectedFunctionType = new FunctionType();
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
    if (this.functionTypeEditSubscription) { this.functionTypeEditSubscription.unsubscribe(); }
  }

}
