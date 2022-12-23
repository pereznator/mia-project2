import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { take, map } from 'rxjs';
import { USER_TYPES } from '../../utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  loading = true;
  USER_TYPES = USER_TYPES;

  constructor(private usersService: UsersService, private router: Router) {
    this.usersService.getCurrentUser().pipe(take(1), map(resp => resp.data)).subscribe(resp => {
      this.loading = false;
      this.user = resp;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
    return;
  }

}
