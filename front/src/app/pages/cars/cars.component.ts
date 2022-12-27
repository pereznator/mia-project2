import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { take, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionComponent } from 'src/app/modals/confirm-action/confirm-action.component';
import { AuthService } from '../../services/auth.service';
import { USER_TYPES } from '../../utils/constants';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  cars: any[] = [];
  loading = false;
  USER_TYPES = USER_TYPES;
  search: string = null;

  constructor(
    private carsService: CarsService,
    private router: Router,
    private location: Location,
    private toastService: ToastService,
    private modalService: NgbModal,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.loading = true;
    let params = {};
    if (this.search) {
      if (this.search.length > 0) {
        params["search"] = this.search;
      }
    }
    this.carsService.getCars(params).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.cars = resp;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }

  searchCars(): void {
    if (this.search === null) {
      return;
    }
    if (this.search.length === 0) {
      return;
    }
    this.getCars();
  }

  resetSearch(): void {
    this.search = null;
    this.getCars();
  }

  removeCar(liscencePlate: string): void {
    const modal = this.modalService.open(ConfirmActionComponent);
    modal.componentInstance.i = "Estas seguro que quieres eliminar este carro?";
    modal.componentInstance.title = "Eliminar Carro";
    modal.result.then(result => {
      this.carsService.removeCar(liscencePlate).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
        this.toastService.showSuccess("Carro eliminado exitosamente.");
        this.getCars();
      }, err => {
        this.toastService.showError("No se pudo eliminar el carro.");
        console.log(err);
      });
    }, dismiss => {});
  }

  reserveCar(liscencePlate: string): void {
    const modal = this.modalService.open(ConfirmActionComponent);
    modal.componentInstance.i = "Estas seguro que quieres reservar este carro?";
    modal.componentInstance.title = "Reservar Carro";
    modal.result.then(result => {
      this.carsService.reserveCar(liscencePlate).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
        this.toastService.showSuccess("Carro reservado exitosamente.");
        this.getCars();
      }, err => {
        this.toastService.showError(err.error);
        console.log(err);
      });
    }, dismiss => {});
  }

  addCar(): void {
    this.router.navigate(["cars", "create"]);
  }

  goBack(): void {
    this.location.back();
  }

}
