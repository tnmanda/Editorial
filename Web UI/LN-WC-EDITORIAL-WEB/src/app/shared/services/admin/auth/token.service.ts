import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { Auth } from '../../../models/admin/auth/auth.model';
import { Token } from '../../../models/admin/auth/token.model';
import * as reviver from '../../../revivers/date.reviver';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private decodeJwt(token: string): string {
    return JSON.stringify(JWT<string>(token));
  }

  public createTokenModel(token: string): Token {
    return JSON.parse(this.decodeJwt(token), reviver.DateReviver);
  }

  public setAuthModel(tokenKeyName: string, authModel: Auth): void {
    localStorage.setItem(tokenKeyName, JSON.stringify(authModel));
  }

  public getTokenFromAuthModel(tokenKeyName: string): string | null {
    if (localStorage.getItem(tokenKeyName) === null) {
      return null;
    }
    const authModel: Auth = JSON.parse(localStorage.getItem(tokenKeyName));
    return authModel.apitokendata.token;
  }

  public getHRTokenFromAuthModel(tokenKeyName: string): string | null {
    if (localStorage.getItem(tokenKeyName) === null) {
      return null;
    }
    const authModel: Auth = JSON.parse(localStorage.getItem(tokenKeyName));
    return authModel.hrtokendata.token;
  }

  public createAuthModelJson(authModel: string): Auth {
    return JSON.parse(authModel, reviver.DateReviver);
  }

  public removeAuthModel(tokenKeyName: string): void {
    localStorage.removeItem(tokenKeyName);
  }
}
