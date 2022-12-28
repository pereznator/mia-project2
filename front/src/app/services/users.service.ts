import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private serverService: ServerService, private authService: AuthService) { }

  getCurrentUser(): Observable<any> {
    return this.serverService.request("GET", `/users/${this.authService.user.userId}`);
  }
  
  getAllUsers(): Observable<any> {
    return this.serverService.request("GET", "/users");
  }
  
  createUser(body: any): Observable<any> {
    return this.serverService.request("POST", "/users", body);
  }

  removeUser(userId: string): Observable<any> {
    return this.serverService.request("DELETE", `/users/${userId}`, {userId});
  }
  updateUser(userId: string, body: any): Observable<any> {
    return this.serverService.request("POST", `/users/${userId}`, body);
  }

}
