import { Injectable } from '@angular/core';

import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { wco_environment } from '../models/wco-environment';
import { TokenService } from '../services/token.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getTokenFromAuthModel(wco_environment.api_token)}`
      }
    });
    return next.handle(request);
  }
}
