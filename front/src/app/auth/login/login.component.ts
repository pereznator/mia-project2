import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  error = false;
  errorMessage = "Intentar mas tarde.";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  get notValidEmail(): boolean {
    return this.loginForm.get("email").touched && this.loginForm.get("email").invalid;
  }

  get notValidPassword(): boolean {
    return this.loginForm.get("password").touched && this.loginForm.get("password").invalid;
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.error = false;
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }
    this.authService.login({
      email: this.loginForm.get("email").value,
      password: this.loginForm.get("password").value
    }).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.authService.saveUser(resp.id, resp.type);
      this.router.navigate(["home"]);
    }, err => {
      console.log(err);
      this.error = true;
      this.errorMessage = err.error.error;
    });
  }

}
