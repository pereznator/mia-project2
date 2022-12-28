import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { take, map } from 'rxjs';
import { Location } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  loading = false;
  newImg = "";
  imgSrc: string = null;

  constructor(
    private userService: UsersService,
    private location: Location,
    private toastService: ToastService
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.loading = true;
    this.userService.getCurrentUser().pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.loading = false;
      this.user = resp;
    }, err => {
      this.loading = false;
    });
  }

  save(): void {
    if (this.user.name.length === 0) {
      return this.toastService.showError("Nombre es necesario");
    }
    this.userService.updateUser(this.user.id, {
      newName: this.user.name,
      newPic: this.imgSrc ? this.imgSrc : null
    }).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.toastService.showSuccess("Cambios guardados.");
      this.getUser();
      console.log(resp);
    }, err => {
      console.log(err);
      this.toastService.showError(err.error);
    });
  }

  processFile(imageInput: any): void {
    if (!imageInput) {
      this.newImg = null;
      return;
    }
    if (imageInput.target.files.length === 0) {
      this.newImg = null;
      return;
    }
    const picFile = imageInput.target.files[0];
    const pattern = /image-*/;

    if (!picFile.type.match(pattern)) {
      this.newImg = null;
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

  goBack(): void {
    this.location.back();
  }

}
