import { AlertService } from './services/alertservice/alertservice';
import { AuthService } from './services/auth/auth.service';
import { Component, DoCheck, OnChanges, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})

export class AppComponent implements OnInit, DoCheck{
  
  
  title = 'team-management';

  alerts: {component: any, message: any}[] = [];
  alertcomponent:any;
  alertmessage:any;

  constructor(private authService:AuthService, private alertService: AlertService){}

  ngOnInit(){

    
    this.alertService.alertSubject.subscribe((data:any) => {
      
      this.alerts = [];
      if(data !== null) { 
        this.alerts.push({component: data.component, message: data.message});
      }
      
    })

  }

  ngDoCheck() {}
    

}
