export interface User {
    [username:string]: {name:string, password:string, role:string}
}


export const USERS: User =  {
        
    "antriksh": {name:"Antriksh Sharma", password:"password", role:"developer"},
    "adityad": {name:"Aditya Desai", password:"password", role:"developer"},
    "adityas": {name:"Aditya Singh", password:"password", role:"developer"},
    "pranav": {name:"Pranav Narnatt", password:"password", role:"developer"},
    "ojas": {name:"Ojas Inamdar", password:"password", role:"developer"}

}