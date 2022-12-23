import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { USER_TYPES } from '../../utils/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  USER_TYPES = USER_TYPES;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logout();
  }

}
