import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../../services/cars.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { take, map } from 'rxjs';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent implements OnInit {

  carForm: FormGroup = this.fb.group({
    liscencePlate: [null, [Validators.required]],
    brand: [null, [Validators.required]],
    model: [null, [Validators.required]],
    agency: [null, [Validators.required]],
    price: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
    private location: Location,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {}

  get notValidLiscencePlate(): boolean {
    return this.carForm.get("liscencePlate").invalid && this.carForm.get("liscencePlate").touched;
  }
  get notValidBrand(): boolean {
    return this.carForm.get("brand").invalid && this.carForm.get("brand").touched;
  }
  get notValidModel(): boolean {
    return this.carForm.get("model").invalid && this.carForm.get("model").touched;
  }
  get notValidAgency(): boolean {
    return this.carForm.get("agency").invalid && this.carForm.get("agency").touched;
  }
  get notValidPrice(): boolean {
    return this.carForm.get("price").invalid && this.carForm.get("price").touched;
  }
  get notValidCity(): boolean {
    return this.carForm.get("city").invalid && this.carForm.get("city").touched;
  }

  submitForm(): void {
    if (this.carForm.invalid) {
      return this.carForm.markAllAsTouched();
    }
    this.carsService.addNewCar({
      liscence_plate: this.carForm.get("liscencePlate").value,
      brand: this.carForm.get("brand").value,
      model: this.carForm.get("model").value,
      agency: this.carForm.get("agency").value,
      price: this.carForm.get("price").value,
      city: this.carForm.get("city").value,
    }).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.toastService.showSuccess("Auto agregado exitosamente.");
      this.router.navigate(["cars"]);
    }, err => {
      console.log(err);
      this.toastService.showError(err.error);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
