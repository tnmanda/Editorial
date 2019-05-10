import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserMap } from 'src/app/shared/models/admin/user-map.model';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { UserMapService } from 'src/app/shared/services/admin/user-map.service';
import { environment } from 'src/environments/environment';
import { AppUserService } from 'src/app/shared/services/admin/app-user.service';
import { AppUser } from 'src/app/shared/models/admin/app-user.model';

@Component({
  selector: 'app-usermap-list',
  templateUrl: './usermap-list.component.html',
  styleUrls: ['./usermap-list.component.css'],
  providers: [MessageService]
})
export class UsermapListComponent implements OnInit, OnDestroy {

  selectedUserMap: UserMap;

  userMapAllSubscription: Subscription;
  userMapOneSubscription: Subscription;

  userMaps: UserMap[];
  public items: MenuItem[];
  home: MenuItem;

  displayAddDialog = false;
  displayEditDialog = false;
  displayDeleteDialog = false;

  constructor(private userMapSrv: UserMapService) { }

  ngOnInit() {
    this.items = [
      {label: 'Administrator'},
      {label: 'User Map', url: 'usermap'},
    ];

    this.home = {icon: 'fa fa-home', url: 'home'};

    this.getUserMaps();
  }

  getUserMaps() {
    this.userMapSrv.apiUrl = environment.user_map.root;
    this.userMapAllSubscription = this.userMapSrv.getAll().subscribe((items: Array<UserMap>) => {
        this.userMaps = items;
    });
  }

  getUserMapByID(userMapID: number) {
    this.userMapSrv.apiUrl = environment.user_map.root;
    this.userMapOneSubscription = this.userMapSrv.getSingle(userMapID.toString()).subscribe(async (item: UserMap) => {
        this.selectedUserMap = item;
        console.log(this.selectedUserMap);
    });
  }


  showAddDialog() {
    this.displayAddDialog = true;
  }

  onAddDialogClose(event) {
    this.displayAddDialog = event;
    this.getUserMaps();
  }

  showEditDialog(hrEditorialUserMapID) {
    this.getUserMapByID(hrEditorialUserMapID);
    this.displayEditDialog = true;
  }

  onEditDialogClose(event) {
    this.displayEditDialog = event;
    this.getUserMaps();
  }

  showDeleteDialog(hrEditorialUserMapID) {
    this.getUserMapByID(hrEditorialUserMapID);
    this.displayDeleteDialog = true;
  }

  onDeleteDialogClose(event) {
    this.displayDeleteDialog = event;
    this.getUserMaps();
  }

  ngOnDestroy(): void {
    if (this.userMapAllSubscription) { this.userMapAllSubscription.unsubscribe(); }
    if (this.userMapOneSubscription) { this.userMapOneSubscription.unsubscribe(); }
  }

}
