import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UsersComponent } from './pages/users/users.component';
import { TripsComponent } from './pages/trips/trips.component';
import { CreateTripComponent } from './pages/create-trip/create-trip.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CreateCarComponent } from './pages/create-car/create-car.component';
import { HomeComponent } from './shared/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionComponent } from './modals/confirm-action/confirm-action.component';
import { ToastComponent } from './shared/toast/toast.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { TripRequestsComponent } from './pages/trip-requests/trip-requests.component';
import { CarRequestsComponent } from './pages/car-requests/car-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateUserComponent,
    UsersComponent,
    TripsComponent,
    CreateTripComponent,
    CarsComponent,
    CreateCarComponent,
    HomeComponent,
    NavbarComponent,
    ConfirmActionComponent,
    RequestsComponent,
    TripRequestsComponent,
    CarRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule,
    ToastComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
