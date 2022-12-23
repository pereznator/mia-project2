import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TripsService } from '../../services/trips.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { take, map } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {

  tripForm = this.fb.group({
    agency: [null, [Validators.required]],
    originCity: [null, [Validators.required]],
    destinationCity: [null, [Validators.required]],
    days: [null, [Validators.required]],
    price: [null, [Validators.required]],
    picture: [null, []],
  });

  error = false;
  errorMessage = "Sucedió un error.";

  constructor(
    private fb: FormBuilder,
    private tripsService: TripsService,
    private router: Router,
    private location: Location,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {}

  get notValidAgency(): boolean {
    return this.tripForm.get("agency").invalid && this.tripForm.get("agency").touched;
  }
  get notValidOriginCity(): boolean {
    return this.tripForm.get("originCity").invalid && this.tripForm.get("originCity").touched;
  }
  get notValidDestinationCity(): boolean {
    return this.tripForm.get("destinationCity").invalid && this.tripForm.get("destinationCity").touched;
  }
  get notValidDays(): boolean {
    return this.tripForm.get("days").invalid && this.tripForm.get("days").touched;
  }
  get notValidPrice(): boolean {
    return this.tripForm.get("price").invalid && this.tripForm.get("price").touched;
  }

  createTrip(): void {
    this.error = false;
    if (this.tripForm.invalid) {
      return this.tripForm.markAllAsTouched();
    }
    this.tripsService.createTrip({
      agency: this.tripForm.get("agency").value,
      origin_city: this.tripForm.get("originCity").value,
      destination_city: this.tripForm.get("destinationCity").value,
      days: this.tripForm.get("days").value,
      price: this.tripForm.get("price").value,
      picture: this.tripForm.get("picture").value,
    }).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.toastService.showSuccess("Viaje creado exitosamente!");
      this.router.navigate(["trips"]);
    }, err => {
      this.toastService.showError("No se pudo crear el viaje.");
      this.error = true;
      this.errorMessage = err.error;
      console.log(err);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
