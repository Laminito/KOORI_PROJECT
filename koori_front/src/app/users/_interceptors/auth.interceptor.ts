import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {

    const token = this.authService.getToken();
    // let token = "AEZRTYUIOPPOIUYTERZ";
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    })
    return next.handle(request);
  }

}

