import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Location } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take, map } from 'rxjs';
import { ConfirmActionComponent } from '../../modals/confirm-action/confirm-action.component';

@Component({
  selector: 'app-car-requests',
  templateUrl: './car-requests.component.html',
  styleUrls: ['./car-requests.component.scss']
})
export class CarRequestsComponent implements OnInit {

  cars: any[];
  loading = false;

  constructor(
    private carsService: CarsService,
    private location: Location,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getCarRequests();
  }

  getCarRequests(): void {
    this.loading = true;
    this.carsService.getActiveCarRequests().pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.cars = resp;
      this.loading = false;
    }, err => {
      this.loading = false;
      this.toastService.showError(err.error);
      console.log(err);
    });
  }

  updateRequest(requestId: any, isApproved: boolean): void {
    const modal = this.modalService.open(ConfirmActionComponent);
    modal.componentInstance.i = `Estas seguro que quiers ${isApproved ? "aprobar" : "rechazar"} la solicitud?`;
    modal.componentInstance.title = `${isApproved ? "Aprobar" : "Rechazar"} solicitud`;
    modal.result.then(result => {
      this.carsService.updateCarRequest(requestId, { isApproved }).pipe(take(1), map(resp => resp.data)).subscribe(resp => {
        this.toastService.showSuccess("Solicitud actualizada.");
        this.getCarRequests();
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
