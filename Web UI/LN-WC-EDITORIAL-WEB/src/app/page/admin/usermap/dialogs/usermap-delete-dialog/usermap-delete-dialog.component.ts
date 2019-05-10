import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UserMap } from 'src/app/shared/models/admin/user-map.model';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserMapService } from 'src/app/shared/services/admin/user-map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usermap-delete-dialog',
  templateUrl: './usermap-delete-dialog.component.html',
  styleUrls: ['./usermap-delete-dialog.component.css']
})
export class UsermapDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedUserMap: UserMap;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  userMapDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private userMapSrv: UserMapService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.userMapSrv.apiUrl = environment.user_map.root;
    this.userMapDeleteSubscription = this.userMapSrv.delete(this.selectedUserMap.hrEditorialUserMapID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'User map successfully deleted.' });
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
    if (this.userMapDeleteSubscription) { this.userMapDeleteSubscription.unsubscribe(); }
  }

}
