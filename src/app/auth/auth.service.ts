import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // isLoggedin = false;
  constructor(private http: HttpClient, private router: Router) {}

  login(payload) {
    return this.http
      .post<any>(`${environment.baseurl}auth/login`, payload, {})
      .pipe(tap((event) => this.setSession(event)));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  private setSession(authResult) {
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', authResult.expiresAt);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
