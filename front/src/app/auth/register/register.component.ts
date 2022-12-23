import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { map, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    username: [null, [Validators.required]],
    email: [null, [Validators.required]],
    picture: [null, []],
    password: [null, [Validators.required]],
    repeatPassword: [null, [Validators.required]],
  });

  error = false;
  errorMessage = "Sucedio un error.";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  get notValidName(): boolean {
    return this.registerForm.get("name").touched && this.registerForm.get("name").invalid;
  }
  get notValidUsername(): boolean {
    return this.registerForm.get("username").touched && this.registerForm.get("username").invalid;
  }
  get notValidPicture(): boolean {
    return this.registerForm.get("picture").touched && this.registerForm.get("picture").invalid;
  }
  get notValidEmail(): boolean {
    return this.registerForm.get("email").touched && this.registerForm.get("email").invalid;
  }
  get notValidPassword(): boolean {
    return this.registerForm.get("password").touched && this.registerForm.get("password").invalid;
  }
  get notValidRepeat(): boolean {
    return this.registerForm.get("repeatPassword").touched && (this.registerForm.get("repeatPassword").invalid || this.registerForm.get("repeatPassword").value !== this.registerForm.get("password").value);
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.error = false;
    if (this.registerForm.invalid) {
      return this.registerForm.markAllAsTouched();
    }
    if (this.registerForm.get("repeatPassword").value !== this.registerForm.get("password").value) {
      this.error = true;
      this.errorMessage = "La contraseña no coincide.";
      return;
    }
    
    this.authService.register({
      name: this.registerForm.get("name").value,
      username: this.registerForm.get("username").value,
      picture: this.registerForm.get("picture").value,
      email: this.registerForm.get("email").value,
      password: this.registerForm.get("password").value,
    }).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.authService.saveUser(resp.id, resp.type);
      this.router.navigate(["login"]);
    }, err => {
      console.log(err);
      this.error = true;
      this.errorMessage = err.error.error;
    });
  }

}
