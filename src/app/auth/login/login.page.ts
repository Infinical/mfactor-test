import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/helpers/loading.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.fb.group({
    email: ['dev1@gmail.com', Validators.required],
    password: ['password123!', Validators.required],
  });

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public loading: LoadingService
  ) {}

  ngOnInit() {}

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  login() {
    this.loading.presentLoading();
    const payload = {
      Username: this.loginForm.value.email,
      Password: this.loginForm.value.password,
    };

    this.auth.login(payload).subscribe((data) => {
      this.loading.dismissLoading();
      this.router.navigate(['/home']);
      // console.log(data);
    });
  }
}
