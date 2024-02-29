import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrl: './nav-dashboard.component.sass'
})
export class NavDashboardComponent {
  constructor(private authService: AuthService) {

  }

  logout(){
    this.authService.logout();
  }
}
