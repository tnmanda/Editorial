import { Injectable } from '@angular/core';
import { wco_environment } from '../models/wco-environment';
import { TokenService } from '../services/token.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalHelperService {

  constructor(public tokenSvc: TokenService) { }

  public getCurrentUser() {
    const token = this.tokenSvc.getTokenFromAuthModel(wco_environment.api_token);
    if (token !== null) {
      const tokenModel = this.tokenSvc.createTokenModel(token);

      return tokenModel.sub;
    }
  }

  public getCurrentUserID() {
    const token = this.tokenSvc.getTokenFromAuthModel(wco_environment.api_token);
    if (token !== null) {
      const tokenModel = this.tokenSvc.createTokenModel(token);

      return tokenModel.appuser_id;
    }
  }

  public getCurrentUserRole() {
    const token = this.tokenSvc.getTokenFromAuthModel(wco_environment.api_token);
    if (token !== null) {
      const tokenModel = this.tokenSvc.createTokenModel(token);

      return tokenModel.rol;
    }
  }

  // public getHRToken() {
  //   const token = this.tokenSvc.getHRTokenFromAuthModel(wco_environment.api_token);
  //   return token;
  // }

  public getApiToken() {
    const token = this.tokenSvc.getTokenFromAuthModel(wco_environment.api_token);
    return token;
  }

  public getHRToken() {
    const token = this.tokenSvc.getHRTokenFromAuthModel(wco_environment.api_token);
    return token;
  }

  public generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
