import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { UserLogin } from 'src/app/shared/models/admin/user-login.model';
import { PageGroupPerRole } from 'src/app/shared/models/admin/pages-per-role.model';
import { AuthService } from 'src/app/shared/services/admin/auth/auth.service';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { PageService } from 'src/app/shared/services/admin/page.service';
import { RoleTypeService } from 'src/app/shared/services/admin/types/role-type.service';
import { TokenService } from 'src/app/shared/services/admin/auth/token.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {

  userLogin: UserLogin;
  signInForm: FormGroup;
  loginSubscription: Subscription;

  pageSubscription: Subscription;
  roleTypeSubscription: Subscription;

  pageGroupPerRole: PageGroupPerRole[];

  isSubmitted = false;

  msgs: Message[] = [];

  constructor(public authService: AuthService,
              private globalHelperSrv: GlobalHelperService,
              private pageSrv: PageService,
              private router: Router,
              private tokenService: TokenService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.initializeForm();
    this.userLogin = new UserLogin;
  }

  initializeForm(): void {

    this.authService.Logout();

    this.signInForm = new FormGroup({
      'domain': new FormControl('hrev', [Validators.required]),
      'userName': new FormControl('hrevuser1', [Validators.required]),
      'password': new FormControl('testpw123!', [Validators.required]),
      'groupCode': new FormControl('HRWCOJOB', [Validators.required])
    });
  }

  onLogin(signInForm) {
    this.isSubmitted = true;
    this.messageService.clear();
    if (signInForm.valid) {
      this.userLogin = this.signInForm.value;
      this.loginSubscription =  this.authService.Login(this.userLogin).subscribe(res => {
        this.authService.userLoggedIn = true;
        this.tokenService.setAuthModel(environment.api_token, res);
        this.signInForm.reset();

        this.getPagesPerRole(this.globalHelperSrv.getCurrentUserRole());
        this.isSubmitted = false;
        this.router.navigate(['/home']);

      }, (error: Error) => {
        this.authService.userLoggedIn = false;
        this.isSubmitted = false;
        console.log(error);
        this.messageService.add({severity: 'error', summary: '', detail: 'Login Failed!'});
      });
    }
  }

  getPagesPerRole(roleTypeID) {
    this.pageSrv.apiUrl = environment.page_management.page.by_role_id;
    this.pageSubscription = this.pageSrv.getByRoleID(roleTypeID).subscribe((items: Array<PageGroupPerRole>) => {
        this.pageGroupPerRole = items;
        this.globalHelperSrv.setPagePerRoleModel(this.pageGroupPerRole);
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) { this.loginSubscription.unsubscribe(); }
    // if (this.pageSubscription) { this.pageSubscription.unsubscribe(); }
  }

}
