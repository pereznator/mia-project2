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

  imgSrc: string = null;

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

  processFile(imageInput: any): void {
    if (!imageInput) {
      this.userForm.controls["picture"].setValue(null);
      return;
    }
    if (imageInput.target.files.length === 0) {
      this.userForm.controls["picture"].setValue(null);
      return;
    }
    const picFile = imageInput.target.files[0];
    const pattern = /image-*/;

    if (!picFile.type.match(pattern)) {
      this.userForm.controls["picture"].setValue(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(picFile);
  }

  handleReaderLoaded(e: any) {
    const reader = e.target;
    this.imgSrc = reader.result;
    //console.log(this.imageSrc.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, ''));
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
      picture: this.userForm.get("picture").value && this.imgSrc ? this.imgSrc : null,
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
