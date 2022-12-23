import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { USER_TYPES } from './utils/constants';
import { AuthGuard } from './guards/auth.guard';
import { UserTypeGuard } from './guards/user-type.guard';
import { UsersComponent } from './pages/users/users.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { TripsComponent } from './pages/trips/trips.component';
import { CreateTripComponent } from './pages/create-trip/create-trip.component';
import { CreateCarComponent } from './pages/create-car/create-car.component';
import { CarsComponent } from './pages/cars/cars.component';
import { HomeComponent } from './shared/home/home.component';
import { RequestsComponent } from './pages/requests/requests.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "users", component: UsersComponent, data: { requiredType: USER_TYPES.ADMIN }, canActivate: [AuthGuard] },
  { path: "users/create", component: CreateUserComponent, data: { requiredType: USER_TYPES.ADMIN }, canActivate: [AuthGuard] },
  { path: "trips", component: TripsComponent, data: { requiredType: USER_TYPES.ADMIN }, canActivate: [AuthGuard] },
  { path: "trips/create", component: CreateTripComponent, data: { requiredType: USER_TYPES.ADMIN }, canActivate: [AuthGuard] },
  { path: "cars", component: CarsComponent, data: { requiredType: USER_TYPES.ADMIN }, canActivate: [AuthGuard] },
  { path: "cars/create", component: CreateCarComponent, data: { requiredType: USER_TYPES.ADMIN }, canActivate: [AuthGuard] },
  { path: "requests", component: RequestsComponent, data: { requiredType: USER_TYPES.ADMIN }, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
