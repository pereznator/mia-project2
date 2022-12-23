import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private serverService: ServerService) { }

  getAllTrips(params: any): Observable<any> {
    return this.serverService.request("GET", "/trips", null, params);
  }

  createTrip(newTrip: any): Observable<any> {
    return this.serverService.request("POST", "/trips", newTrip);
  }
  
  removeTrip(tripId: string): Observable<any> {
    return this.serverService.request("DELETE", `/trips/${tripId}`, {});
  }
  
  reserveTrip(tripId: string): Observable<any> {
    return this.serverService.request("POST", `/trips/reserves/${tripId}`, {});
  }
  getRequests(): Observable<any> {
    return this.serverService.request("GET", "/trips/reserves");
  }

}
