import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  request(method: string, url: string, body?: any, queryParams?: any): Observable<any> {
    const requestUrl = `${environment.api_url}${url}`;
    //const requestUrl = `http://54.89.223.162:3000${url}`;
    let headerData = {
      userid: this.authService.user.userId
    };
    let headers = new HttpHeaders(headerData);
    let params = {}; // Params to send on the request
    if (queryParams) {
      params = queryParams;
    }

    let returnObservable: Observable<any> = null;

    switch (method) {
      //  Get method
      case 'GET':
        returnObservable = this.http.get(requestUrl, {
          headers,
          params
        });
        break;
      //  Post method
      case 'POST':
        if (body == null) {
          break;
        }
        returnObservable = this.http.post(requestUrl, body, {
          headers,
          params
        });
        break;
      case 'DELETE':
        if (body == null) {
          break;
        }
        returnObservable = this.http.delete(requestUrl, {
          headers
        });
        break;

    }
    return returnObservable.pipe(
      catchError(err => {
        if (err.status === 401) {
          return throwError(this.authService.logout());
        }
        return throwError(err.error);
      })
    );
  }

}
