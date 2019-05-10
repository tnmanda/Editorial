import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FunctionType } from '../../../../../../shared/models/admin/types/function-type.model';
import { Subscription } from 'rxjs';
import { FunctionTypeService } from '../../../../../../shared/services/admin/types/function-type.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-function-type-delete-dialog',
  templateUrl: './function-type-delete-dialog.component.html',
  styleUrls: ['./function-type-delete-dialog.component.css']
})
export class FunctionTypeDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedFunctionType: FunctionType;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  functionTypeDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private functionTypeSrv: FunctionTypeService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
  this.functionTypeSrv.apiUrl = environment.functionType.root;
  this.functionTypeDeleteSubscription = this.functionTypeSrv.delete(this.selectedFunctionType.functionTypeID).subscribe(result => {
  this.messageService.add({severity: 'success', summary: 'Success Message',
  detail: 'Item ' + this.selectedFunctionType.functionTypeName + ' successfully deleted.' });
  this.onClose();
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
    if (this.functionTypeDeleteSubscription) { this.functionTypeDeleteSubscription.unsubscribe(); }
  }

}
