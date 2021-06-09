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
import { ToastController } from '@ionic/angular';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private toast: ToastController) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.auth.isLoggedin = false;
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            localStorage.setItem('token', event.body.token);
            this.auth.isLoggedin = true;
          }
          return event;
        })
      );
    }

    const req1 = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body.token !== null) {
            this.auth.isLoggedin = true;
            localStorage.setItem('token', event.body.token);
          }
        }
        return event;
      })
    );
  }
}
