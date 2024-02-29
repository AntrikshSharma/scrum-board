import { AlertService } from '../../services/alertservice/alertservice';
import { ProjectService } from '../../services/projects/project.service';
import { UserService } from './../../services/user/user.service';
import { User } from './../../services/user/users';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.sass'
})
export class CreateProjectComponent{

  @Output() close: EventEmitter<any> = new EventEmitter();

  searchQuery: string = '';
  searchResult = [];
  
  title:string = "";
  description:string = "";
  selectedUsers = [];
  managers = [this.UserService.getCurrentUser().id];
  
  
  
  constructor(private UserService: UserService, private projectService: ProjectService, private alerts: AlertService){
  }

  searchUser() {
    if (this.searchQuery.length < 3) {
      this.searchResult = [];
    }
    else {
      this.searchResult = this.UserService.searchUser(this.searchQuery); 
    }
  }

  addUser(user){
    if(!this.selectedUsers.includes(user.id))
    {this.selectedUsers.push(user.id);}
  }
  removeUser(username:string){
    this.selectedUsers.splice(this.selectedUsers.indexOf(username), 1);
  }

  createProject() {
    try {

      if (this.title.length < 3) {
        throw new Error("Title should be atleast 3 characters long");
      }
      if (this.description.length < 10) {
        throw new Error("Description should be atleast 10 characters long");
      }
      const id = this.title.toLowerCase().split(' ').join('-');
      const project = {
        id: id,
        title: this.title,
        description: this.description,
        managers: this.managers,
        members: this.selectedUsers
      }
      this.projectService.createProject(project);
      this.alerts.success("Project " + id + " created successfully");
      this.emitClose();
    }
    catch (e) {
      this.alerts.error(e.message);
    }
  }

  emitClose() {
    this.close.emit();
  }

  getUser() {
    return this.UserService.getCurrentUser().name;
  }

}
