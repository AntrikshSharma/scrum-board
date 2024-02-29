import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User, USERS} from "./users";

@Injectable({
    providedIn: "root"
    })
export class UserService {

    constructor() { }

    users: User = USERS;

    getUser(username:string) {

        if (!this.users[username]) {
            return undefined;
        }
        return {
            id: username,
            name:this.users[username].name,
            role:this.users[username].role
        }
    }


    searchUser(query:string) {
        let result = [];
        for (let user in this.users) {

            if (this.users[user].name.toLowerCase().includes(query.toLowerCase())) {
                result.push(this.getUser(user));
            }
        }

        return result;
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem("user"));
    }

    
    post(request: {username:string, password:string}): Observable<any> {

        
        if (!(request.username in this.users)) {
            
            return of(JSON.stringify({message:"Invalid Credentials", status:401}));
        }

        if (this.users[request.username].password !== request.password) {
            return of(JSON.stringify({message:"Invalid Credentials", status:401}));
        }
        else {
            return of(JSON.stringify({
                message:"Login Successfull", 
                status:201, 
                user:this.getUser(request.username)
            }))
        }
    }
}
