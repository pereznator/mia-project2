import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { ToastService } from '../../services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take, map } from 'rxjs';
import { ConfirmActionComponent } from '../../modals/confirm-action/confirm-action.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-trip-requests',
  templateUrl: './trip-requests.component.html',
  styleUrls: ['./trip-requests.component.scss']
})
export class TripRequestsComponent implements OnInit {

  trips: any[];
  loading = false;

  constructor(
    private tripsService: TripsService,
    private location: Location,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.loading = true;
    this.tripsService.getAllActiveReqeusts().pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.trips = resp;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }

  approveTrip(requestId: string, isApproved: boolean): void {
    const modal = this.modalService.open(ConfirmActionComponent);
    modal.componentInstance.i = `Estas seguro que quieres ${isApproved ? "aprobar" : "rechazar"} la solicitud?`;
    modal.componentInstance.title = `${isApproved ? "Aprobar" : "Rechazar"} Solicitud`;
    modal.result.then(result => {
      this.tripsService.approveTripRequest(requestId, {isApproved}).pipe(take(1), map(resp => resp)).subscribe(resp => {
        this.toastService.showSuccess("Solicitud calificada");
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
