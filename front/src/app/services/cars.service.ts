import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private serverService: ServerService) { }

  getCars(): Observable<any> {
    return this.serverService.request("GET", "/cars");
  }

  addNewCar(carBody: any): Observable<any> {
    return this.serverService.request("POST", "/cars", carBody);
  }

  removeCar(liscencePlate: string): Observable<any> {
    return this.serverService.request("DELETE", `/cars/${liscencePlate}`, {});
  }

}
