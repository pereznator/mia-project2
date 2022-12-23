import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { USER_TYPES } from '../../utils/constants';
import { UsersService } from '../../services/users.service';
import { take, map } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    username: [null, [Validators.required]],
    email: [null, [Validators.required]],
    picture: [null, []],
    type: [null, [Validators.required]],
    password: [null, [Validators.required]],
    repeatPassword: [null, [Validators.required]],
  });

  userTypes = [
    { label: "Tourist", value: USER_TYPES.TOURIST },
    { label: "Recepcionista", value: USER_TYPES.RECEPTIONIST },
    { label: "Administrador", value: USER_TYPES.ADMIN },
  ];

  error = false;
  errorMessage = "Sucedio un error.";

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router, private toastService: ToastService, private location: Location) { }

  ngOnInit(): void {}

  get notValidName(): boolean {
    return this.userForm.get("name").invalid && this.userForm.get("name").touched;
  }
  get notValidUsername(): boolean {
    return this.userForm.get("username").invalid && this.userForm.get("username").touched;
  }
  get notValidEmail(): boolean {
    return this.userForm.get("email").invalid && this.userForm.get("email").touched;
  }
  get notValidType(): boolean {
    return this.userForm.get("type").invalid && this.userForm.get("type").touched;
  }
  get notValidPassword(): boolean {
    return this.userForm.get("password").invalid && this.userForm.get("password").touched;
  }
  get notValidRepeatPassword(): boolean {
    return this.userForm.get("repeatPassword").invalid && (this.userForm.get("repeatPassword").touched || (this.userForm.get("repeatPassword").value !== this.userForm.get("password").value));
  }

  createUser(): void {
    this.error = false;
    if (this.userForm.invalid) {
      return this.userForm.markAllAsTouched();
    }
    if (this.userForm.get("repeatPassword").value !== this.userForm.get("password").value) {
      this.error = true;
      this.errorMessage = "Contraseñas no coinciden.";
      return;
    }
    this.usersService.createUser({
      name: this.userForm.get("name").value,
      username: this.userForm.get("username").value,
      email: this.userForm.get("email").value,
      type: this.userForm.get("type").value,
      picture: this.userForm.get("picture").value,
      password: this.userForm.get("password").value,
    }).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.toastService.showSuccess("Usuario creado correctamente!");
      this.router.navigate(["users"]);
    }, err => {
      this.error = true;
      this.errorMessage = err.error;
      this.toastService.showError(err.error);
      console.log(err);
    });
  }

  goBack() {
    this.location.back();
  }

}
