import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private auth: AuthService
  ) {
    console.log(this.auth.isLoggedIn());
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
