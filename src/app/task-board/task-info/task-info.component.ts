import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../services/projects/tasks/tasks';
import { TaskService } from '../../services/projects/tasks/task.service';
import { AlertService } from '../../services/alertservice/alertservice';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.sass'
})
export class TaskInfoComponent implements OnInit{

  @Input() task: Task;
  @Input() project_id: string;
  @Input() sprint_id: number;
  status: 'NEW' | 'IN-PROGRESS' | 'COMPLETED' | 'BLOCKED';

  
  
  
  newTitle: string;
  newDescription: string;
  newStatus: 'NEW' | 'IN-PROGRESS' | 'COMPLETED' | 'BLOCKED';
  comment: string;

  edit: boolean = false;

  
  constructor(
    private taskService: TaskService,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.newTitle = this.task.title;
    this.newDescription = this.task.description;
    this.newStatus = this.task.status;

  }


  editTask(){
    this.edit = !this.edit;

    if(
    this.newTitle !== this.task.title
    || this.newDescription !== this.task.description
    || this.newStatus !== this.task.status
    ){
      
      let ans = confirm('Are you sure you want to discard changes?');
      if(ans) {
        this.newTitle = this.task.title;
        this.newDescription = this.task.description;
        this.newStatus = this.task.status;
      }
      else {
        this.edit = true;
      }
    }
    
  }


  updateTask(){
    
    let ans = confirm('Are you sure you want to update task?');
    if(!ans) return;

    try{
      this.task.title = this.newTitle;
    this.task.description = this.newDescription;
    this.task.status = this.newStatus;
    this.taskService.updateTask(this.project_id, this.sprint_id, this.task);
    this.alertService.success('Task updated successfully');
    this.edit = false;
    }
    catch(e){
      this.alertService.error('Error updating task');
    }
    
  }

  addComment() {

    this.task.comments.push({
      user: this.userService.getCurrentUser().id,
      comment: this.comment,
      date: new Date().toDateString()
    })

    this.taskService.updateTask(this.project_id, this.sprint_id, this.task);
  }
}
