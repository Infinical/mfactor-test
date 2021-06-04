import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.auth.isLoggedin = false;
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(event.body.token);
            sessionStorage.setItem('token', event.body.token);
            this.auth.isLoggedin = true;
          }
          return event;
        })
      );
    }

    const req1 = request.clone({
      headers: request.headers.set('Authorization', `${token}`),
    });

    return next.handle(req1).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body.token !== null) {
            sessionStorage.setItem('token', event.body.token);
          }
        }
        return event;
      })
    );
  }
}
