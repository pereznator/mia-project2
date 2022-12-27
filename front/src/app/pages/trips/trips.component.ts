import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { take, map } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionComponent } from '../../modals/confirm-action/confirm-action.component';
import { AuthService } from '../../services/auth.service';
import { USER_TYPES } from '../../utils/constants';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  trips: any[] = [];
  loading = false;
  USER_TYPES = USER_TYPES;
  search: string = null;

  constructor(
    private tripsService: TripsService,
    private router: Router,
    private location: Location,
    private toastService: ToastService,
    private modalService: NgbModal,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.loading = true;
    let params = {}
    if (this.search) {
      if (this.search.length > 0) {
        params["search"] = this.search;
      }
    }
    this.tripsService.getAllTrips(params).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.trips = resp;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }

  searchTrips(): void {
    if (!this.search) {
      return;
    }
    if (this.search.length === 0) {
      return;
    }
    this.getTrips();
  }

  resetSearch(): void {
    this.search = null;
    this.getTrips();
  }

  createTrip(): void {
   this.router.navigate(["trips", "create"]); 
  }

  removeTrip(tripId: string): void {
    const modal = this.modalService.open(ConfirmActionComponent);
    modal.componentInstance.i = "Estas seguro que quieres eliminar el viaje?";
    modal.componentInstance.title = "Eliminar Viaje";
    modal.result.then(result => {
      this.tripsService.removeTrip(tripId).pipe(take(1), map(resp =>resp.data)).subscribe(resp => {
        this.toastService.showSuccess("Viaje eliminado con exito!");
        this.getTrips();
      }, err => {
        console.log(err);
        this.toastService.showError(err.error);
      });
    }, dismiss => {});
  }

  requestTrip(tripId: string): void {
    const modal = this.modalService.open(ConfirmActionComponent);
    modal.componentInstance.i = "Estas seguro que quieres reservar el viaje?";
    modal.componentInstance.title = "Reservar Viaje";
    modal.result.then(result => {
      this.tripsService.reserveTrip(tripId).pipe(take(1), map(resp =>resp.data)).subscribe(resp => {
        this.toastService.showSuccess("Solicitud de reserva enviado exitosamente!");
        this.getTrips();
      }, err => {
        console.log(err);
        this.toastService.showError(err.error);
      });
    }, dismiss => {});
  }

  goBack(): void {
    this.location.back();
  }

}
