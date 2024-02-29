import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent implements DoCheck{

  constructor(private authService: AuthService) {}

  loggedIn = false;
  private isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  ngOnInit() {
    this.loggedIn = this.isLoggedIn();
  }

  ngDoCheck() {
    this.loggedIn = this.isLoggedIn();
  }

}
