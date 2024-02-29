import { ProjectService } from './../services/projects/project.service';
import { AlertService } from './../services/alertservice/alertservice';
import { Task } from './../services/projects/tasks/tasks';
import { Component, DoCheck, Input, OnInit, SimpleChanges } from '@angular/core';
import { TaskService } from '../services/projects/tasks/task.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskInfoComponent } from './task-info/task-info.component';
import { AddTaskComponent } from './add-task/add-task.component';


@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.sass'
})
export class TaskBoardComponent implements OnInit, DoCheck{

  @Input('projectId') project_id: string;
  sprint_id: number = 0;
  
  taskSubscription: Subscription;
  sprintIdSubscription: Subscription;

  tasks:any;
  newTasks: Task[] = [];
  progressTasks: Task[] = [];
  completedTasks: Task[] = [];
  blockedTasks: Task[] = [];


  dragTask: Task;


  constructor(private taskService: TaskService, 
    private route: ActivatedRoute, private alertService:AlertService, 
    private userService: UserService, 
    private projectService: ProjectService, 
    private modalService: NgbModal) { }


  private seggerateTasks() {

    this.newTasks = [];
    this.progressTasks = [];
    this.completedTasks = [];
    this.blockedTasks = [];
    
    this.tasks.forEach((task: Task) => {
      if (task.status === "NEW") {
        this.newTasks.push(task);
      } else if (task.status === "IN-PROGRESS") {
        this.progressTasks.push(task);
      } else if (task.status === "COMPLETED") {
        this.completedTasks.push(task);
      } else if (task.status === "BLOCKED") {
        this.blockedTasks.push(task);
      }
    });
  }

  ngOnInit() {  

    this.sprintIdSubscription = this.route.queryParams.subscribe(
      (params) => {;
        this.sprint_id = params["sprintId"];   
        console.log(this.sprint_id);
        if(this.taskSubscription) {this.taskSubscription.unsubscribe();}
        this.taskSubscription = this.taskService.getTasks(this.project_id, this.sprint_id).subscribe(
          (tasks) => { 
            this.tasks = tasks;
            console.log(this.tasks);
            this.seggerateTasks();
          }
        )
      }
    );

  }
  ngDoCheck(): void {
    
  }

  onDragStart(item: Task) {
    this.dragTask = item;
  }

  onDrop(event: any, status: "NEW" | "IN-PROGRESS" | "COMPLETED" | "BLOCKED") {
    
    if(this.dragTask.users.includes(this.userService.getCurrentUser().id) || this.projectService.getProject(this.project_id).managers.includes(this.userService.getCurrentUser().id)) { 

      this.dragTask.status = status;
      this.taskService.updateTask(this.project_id, this.sprint_id, this.dragTask);
      this.alertService.success(this.dragTask.title + " moved to " + status);
    }
    else {
      this.alertService.error("You are not authorized to move this task");
    }
    
  }

  onDragOver(event:any) {
    event.preventDefault();
  }

  openInfo(task: Task) {
    const modalRef = this.modalService.open(TaskInfoComponent);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.project_id = this.project_id;
    modalRef.componentInstance.sprint_id = this.sprint_id;
  }

  openAddTask(status:string) {
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.componentInstance.status = status;
    modalRef.componentInstance.projectId = this.project_id;
    modalRef.componentInstance.sprintId = this.sprint_id;
  }

}
