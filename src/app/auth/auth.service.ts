import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedin = false;
  constructor(private http: HttpClient) {}

  login(payload) {
    return this.http.post(`${environment.baseurl}auth/login`, payload, {});
  }
}
