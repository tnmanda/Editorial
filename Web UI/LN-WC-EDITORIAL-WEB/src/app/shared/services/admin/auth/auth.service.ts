import { Injectable } from '@angular/core';
import { AppErrorHandler } from '../../../helpers/app-error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin } from '../../../models/admin/user-login.model';
import { Observable } from 'rxjs';
import { Auth } from '../../../models/admin/auth/auth.model';
import { environment } from '../../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Token } from '../../../models/admin/auth/token.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AppErrorHandler {
  public userLoggedIn: boolean;
  public currentUser: UserLogin;

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
    super();
  }

  Login(userLogin: UserLogin): Observable<Auth> {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post(environment.user_auth, userLogin, { headers : reqHeader })
    .pipe(map((returnToken: Auth) => {
      return returnToken;
    }), catchError(this.handleError));
  }

  public IsAuthenticated(): boolean {
    const auth: Auth = this.tokenService.createAuthModelJson(localStorage.getItem(environment.api_token));

    // Read the token and make sure it has not expired.
    return auth != null && (moment.utc(auth.apitokendata.expiration) > moment.utc(new Date()));
  }

  Logout(): void {
    this.userLoggedIn = false;
    localStorage.removeItem(environment.api_token);
    localStorage.removeItem(environment.hr_token);
    localStorage.removeItem('rolepages');
  }
}
