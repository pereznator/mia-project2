import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private serverService: ServerService) { }

  getCars(params): Observable<any> {
    return this.serverService.request("GET", "/cars", null, params);
  }

  addNewCar(carBody: any): Observable<any> {
    return this.serverService.request("POST", "/cars", carBody);
  }

  removeCar(liscencePlate: string): Observable<any> {
    return this.serverService.request("DELETE", `/cars/${liscencePlate}`, {});
  }

  reserveCar(liscencePlate: string): Observable<any> {
    return this.serverService.request("POST", `/cars/reserves/${liscencePlate}`, {});
  }

  getCarRequests(): Observable<any> {
    return this.serverService.request("GET", "/cars/reserves");
  }
  
  getActiveCarRequests(): Observable<any> {
    return this.serverService.request("GET", "/cars/reserves/all");
  }
  updateCarRequest(requestId: string, body: any): Observable<any> {
    return this.serverService.request("POST", `/cars/reserves/approve/${requestId}`, body);
  }

}
