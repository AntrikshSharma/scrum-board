import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from './../../services/projects/project.service';
import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../services/projects/tasks/tasks';
import { TaskService } from '../../services/projects/tasks/task.service';
import { AlertService } from '../../services/alertservice/alertservice';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.sass'
})
export class AddTaskComponent implements OnInit {
  @Input('status') status: 'NEW' | 'IN-PROGRESS' | 'COMPLETED' | 'BLOCKED';
  @Input('projectId') projectId: string;
  @Input('sprintId') sprintId: number;
  taskTitle: string;
  taskDescription: string;
  taskAssignee: string[];
  taskDate: string = new Date().toDateString();

  task: Task;

  searchQuery: string = '';
  searchResult = [];
  selectedUsers = [];


  ngOnInit() {

  }
  constructor(public activeModal: NgbActiveModal, 
    private ProjectService: ProjectService, 
    private taskService: TaskService,
    private alertService: AlertService) { }

  searchUser() {
    
    let result = [];
    
    if(this.searchQuery.length >= 3){
      
      let users = this.ProjectService.getProject(this.projectId).members.concat(this.ProjectService.getProject(this.projectId).managers);
  
      for (let user of users) {
        
        if (user.toLowerCase().includes(this.searchQuery.toLowerCase())) {
          result.push(user);
        }
        this.searchResult = result;
  
      }
    }

  }

  addUser(user: string){
    if(!this.selectedUsers.includes(user))
    {this.selectedUsers.push(user);
    this.searchResult = [];}
  }
  removeUser(username: string){
    this.selectedUsers.splice(this.selectedUsers.indexOf(username), 1);
  }

  addTask()
  {
    this.task = {
      id: 0,
      title: this.taskTitle,
      description: this.taskDescription,
      users: this.selectedUsers,
      date: this.taskDate,
      status: this.status,
      comments: []
    }

    try {

      this.taskService.addTask(this.projectId, this.sprintId, this.task);
      this.alertService.success("Task " + this.taskTitle + " created successfully");
      this.activeModal.close();
    }
    catch (error) {

      this.alertService.error(error.message);
      
    }




  }


}
