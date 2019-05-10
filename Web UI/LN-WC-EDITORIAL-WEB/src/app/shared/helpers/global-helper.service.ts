import { Injectable } from '@angular/core';
import { TokenService } from '../services/admin/auth/token.service';
import { environment } from '../../../environments/environment';
import { PageGroupPerRole } from '../models/admin/pages-per-role.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalHelperService {

  constructor(public tokenSvc: TokenService) { }

  public getCurrentUser() {
    const token = this.tokenSvc.getTokenFromAuthModel(environment.api_token);
    if (token !== null) {
      const tokenModel = this.tokenSvc.createTokenModel(token);

      return tokenModel.sub;
    }
  }

  public getCurrentUserID() {
    const token = this.tokenSvc.getTokenFromAuthModel(environment.api_token);
    if (token !== null) {
      const tokenModel = this.tokenSvc.createTokenModel(token);

      return tokenModel.appuser_id;
    }
  }

  public getCurrentUserName() {
    const token = this.tokenSvc.getTokenFromAuthModel(environment.api_token);
    if (token !== null) {
      const tokenModel = this.tokenSvc.createTokenModel(token);

      return tokenModel.given_name;
    }
  }

  public getCurrentUserRole() {
    const token = this.tokenSvc.getTokenFromAuthModel(environment.api_token);
    if (token !== null) {
      const tokenModel = this.tokenSvc.createTokenModel(token);

      return tokenModel.rol;
    }
  }

  public getHRToken() {
    const token = this.tokenSvc.getHRTokenFromAuthModel(environment.api_token);
    return token;
  }

  public getApiToken() {
    const token = this.tokenSvc.getTokenFromAuthModel(environment.api_token);
    return token;
  }

  public generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public setPagePerRoleModel(pagesPerRole: Array<PageGroupPerRole>): void {
    localStorage.setItem('rolepages', JSON.stringify(pagesPerRole));
  }

  public getPagePerRoleModel(): Array<PageGroupPerRole> | null {
    if (localStorage.getItem('rolepages') === null) {
      return null;
    }
    const pagesPerRole: Array<PageGroupPerRole> = JSON.parse(localStorage.getItem('rolepages'));

    return pagesPerRole;
  }

  public localToUtc(date: Date): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),
    date.getHours(), date.getMinutes(), date.getSeconds()));
  }

  public utcToLocal(date: Date): Date {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }
}
