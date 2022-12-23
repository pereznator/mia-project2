import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { take, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionComponent } from 'src/app/modals/confirm-action/confirm-action.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  cars: any[];
  loading = false;

  constructor(
    private carsService: CarsService,
    private router: Router,
    private location: Location,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.loading = true;
    this.carsService.getCars().pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.cars = resp;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    });
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

  addCar(): void {
    this.router.navigate(["cars", "create"]);
  }

  goBack(): void {
    this.location.back();
  }

}
