import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit, DoCheck {

  constructor(private authService: AuthService,
    private router: Router) { }

  username: string = "";
  password: string = "";
  componentRef: any;


  login() {
    this.authService.login(this.username, this.password)
  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard'])
    }
    this.componentRef = PageNotFoundComponent;

  }

  ngDoCheck() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard'])
    }
  }
}
