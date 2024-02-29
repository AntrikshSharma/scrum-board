import { AlertService } from './../alertservice/alertservice';
import { Injectable} from "@angular/core";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";
import { map } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService{
    
    constructor(private userService:UserService, private router: Router, private alertService:AlertService) {
        
        this.checkStartSession();
    }
    
    private logoutTimer: any;
    private readonly SESSION_TIME: number = 1000 * 60 * 60;
    
    private currentUser: {
        id:string,
        name:string,
        role:string
    }
    
    private resetLogoutTimer() {
        
        clearTimeout(this.logoutTimer);
        this.logoutTimer = setTimeout(() => {
            this.alertService.error("Session Expired");
            this.logout()
        }, this.SESSION_TIME);
    }
    
    private checkStartSession() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if(user) {
            this.resetLogoutTimer();
        }
    }
    
    login(user:string, pass:string) {

        

        this.userService.post({username:user, password:pass}).pipe(
            map(respone => JSON.parse(respone))
        ).subscribe(
            
            (response) => {
                
                if(response.status === 201 ) {
                    
                    sessionStorage.setItem('user', JSON.stringify(response.user));
                    this.resetLogoutTimer();
                    this.alertService.success(response.message);
                    this.router.navigate(['dashboard']);
                }
                else {
                    this.alertService.error(response.message);
                }
            })
            
    }
        
    logout() {
            
        if(sessionStorage.getItem('user')) {
            
            sessionStorage.removeItem('user');
        }
        clearTimeout(this.logoutTimer);
        this.router.navigate(['']);
        window.location.reload();
    }
        
    isLoggedIn() {
        return !!sessionStorage.getItem('user')
    }
    
        
}