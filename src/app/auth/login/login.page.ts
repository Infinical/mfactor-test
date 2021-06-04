import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    const payload = {
      Username: this.loginForm.value.email,
      Password: this.loginForm.value.password,
    };

    this.auth.login(payload).subscribe((data) => {
      this.router.navigate(['/home']);
      // console.log(data);
    });
  }
}
