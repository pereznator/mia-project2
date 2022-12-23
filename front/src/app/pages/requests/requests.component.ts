import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { CarsService } from '../../services/cars.service';
import { take, map } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  showingNow = "trips"
  loading = false;
  requests: any[];
  carRequests: any[];

  constructor(
    private tripsService: TripsService,
    private carsService: CarsService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getTripRequests();
  }

  onChangeView(view: string) {
    this.showingNow = view;
    if (this.showingNow === "trips") {
      this.getTripRequests();
    } else {
      this.getCarRequests();
    }
  }

  getTripRequests(): void {
    this.loading = true;
    this.tripsService.getRequests().pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.requests = resp; 
      this.loading = false;
    }, err => {
      this.loading = false;
      this.toastService.showError(err.error);
      console.log(err);
    });
  }

  getCarRequests(): void {
    this.loading = true;
    this.carsService.getCarRequests().pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.carRequests = resp; 
      this.loading = false;
    }, err => {
      this.loading = false;
      this.toastService.showError(err.error);
      console.log(err);
    });
  }

}
