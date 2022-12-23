import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId: string;
  private userType: string;

  constructor(private http: HttpClient, private router: Router) {
    this.getInfo();
  }

  get user(): any {
    return this.getInfo();
  }

  get type(): string {
    return this.getInfo().userType;
  }

  get isAuthenticated(): boolean {
    if (localStorage.getItem("userIdTest") && localStorage.getItem("userTypeTest")) {
      return true;
    }
    return false;
  }

  login(body: any): Observable<any> {
    const requestUrl = `http://localhost:3000/auth/login`;
    let headerData = {};
    let headers = new HttpHeaders(headerData);
    let params = {};

    let returnObservable: Observable<any> = null;
    returnObservable = this.http.post(requestUrl, body, {
      headers,
      params
    });

    return returnObservable;
  }
  register(body: any): Observable<any> {
    const requestUrl = `http://localhost:3000/auth/register`;
    let headerData = {};
    let headers = new HttpHeaders(headerData);
    let params = {};

    let returnObservable: Observable<any> = null;
    returnObservable = this.http.post(requestUrl, body, {
      headers,
      params
    });

    return returnObservable;
  }

  saveUser(userId: string, userType: string): void {
    this.userId = userId;
    this.userType = userType;
    localStorage.setItem("userIdTest", this.userId);
    localStorage.setItem("userTypeTest", this.userType);
  }

  private getInfo(): any {
    return {
      userId: localStorage.getItem("userIdTest") ? localStorage.getItem("userIdTest") : null,
      userType: localStorage.getItem("userTypeTest") ? localStorage.getItem("userTypeTest") : null,
    };
  }

  logout(): void {
    localStorage.removeItem("userIdTest");
    localStorage.removeItem("userTypeTest");
    this.router.navigate(["/login"]);
  }

}
