import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.fb.group({
    email: ['dev1@gmail.com', Validators.required],
    password: ['password123!“”', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {}

  login() {
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.auth.login(payload).subscribe((data) => {
      console.log(data);
    });
  }
}
