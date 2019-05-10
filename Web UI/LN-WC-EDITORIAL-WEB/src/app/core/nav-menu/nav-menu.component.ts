import { Component, OnInit, OnChanges } from '@angular/core';
import { Token } from '../../shared/models/admin/auth/token.model';
import { TokenService } from '../../shared/services/admin/auth/token.service';
import { AuthService } from '../../shared/services/admin/auth/auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { GlobalHelperService } from '../../shared/helpers/global-helper.service';
import { PageService } from '../../shared/services/admin/page.service';
import { Subscription } from 'rxjs';
import { RoleTypeService } from '../../shared/services/admin/types/role-type.service';
import { RoleType } from '../../shared/models/admin/types/role-type.model';

import {MenuItem} from 'primeng/api';
import { PageGroupPerRole } from '../../shared/models/admin/pages-per-role.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  pageSubscription: Subscription;
  roleTypeSubscription: Subscription;

  pageGroupPerRole: PageGroupPerRole[];

  items: MenuItem[];

  constructor(public globalHelperSrv: GlobalHelperService,
              public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  // console.log(this.globalHelperSrv.getPagePerRoleModel());
  }


  onLogout(): void {
    this.authService.Logout();
    if (!this.authService.userLoggedIn) {
      this.router.navigate(['']);
    }
  }

}
