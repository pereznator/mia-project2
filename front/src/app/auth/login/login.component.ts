import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  get notValidEmail(): boolean {
    return this.loginForm.get("email").touched && this.loginForm.get("email").invalid;
  }

  get notValidPassword(): boolean {
    return this.loginForm.get("password").touched && this.loginForm.get("password").invalid;
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }
  }

}
