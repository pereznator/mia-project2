import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { take, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionComponent } from 'src/app/modals/confirm-action/confirm-action.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any[];
  loading = false;

  constructor(
    private location: Location,
    private router: Router,
    private usersService: UsersService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) { }

  ngOnInit(): void { 
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.usersService.getAllUsers().pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.users = resp;
      this.loading = false;
    }, err => {
      this.loading = false;
      this.toastService.showError(err.error);
      console.log(err);
    });
  }

  removeUser(userId: string): void {
    const modal = this.modalService.open(ConfirmActionComponent);
    modal.componentInstance.i = "Estas seguro que quieres eliminar este usuario?";
    modal.componentInstance.title = "Eliminar Usuario";
    modal.result.then( result => {
      this.usersService.removeUser(userId).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
        this.toastService.showSuccess("Usuario eliminado exitosamente.");
        this.getUsers();
      }, err => {
        this.toastService.showError(err.error);
        console.log(err);
      });
    }, dismiss => {});
  }

  newUser(): void {
    this.router.navigate(["users", "create"]);
  }

  goBack(): void {
    this.location.back();
  }

}
