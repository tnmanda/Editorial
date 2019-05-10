import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Team } from '../../../../../shared/models/admin/team.model';
import { Subscription } from 'rxjs';
import { TeamService } from '../../../../../shared/services/admin/team.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-team-delete-dialog',
  templateUrl: './team-delete-dialog.component.html',
  styleUrls: ['./team-delete-dialog.component.css']
})
export class TeamDeleteDialogComponent implements OnInit, OnDestroy {

  @Input() selectedTeam: Team;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  teamDeleteSubscription: Subscription;

  errorMessage: string;

  constructor(private teamSrv: TeamService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSave() {
    this.teamSrv.apiUrl = environment.team.root;
    this.teamDeleteSubscription = this.teamSrv.delete(this.selectedTeam.teamID).subscribe(result => {
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Team successfully deleted.' });
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
    if (this.teamDeleteSubscription) { this.teamDeleteSubscription.unsubscribe(); }
  }

}
