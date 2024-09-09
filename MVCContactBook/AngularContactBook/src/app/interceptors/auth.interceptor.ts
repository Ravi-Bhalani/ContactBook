import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/helpers/localstorage.service';
import { LocalStorageKeys } from '../services/helpers/localstoragekeys';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorage : LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorage.getItem(LocalStorageKeys.TokenName);
    if(token){
      const cloneRequest = request.clone({
        headers : request.headers.set('Authorization',`Bearer ${token}`)
      });

      return next.handle(cloneRequest);
    }else{
      return next.handle(request);
    }
    
  }
}
