import { UserService } from './../services/user/user.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProjectService } from '../services/projects/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../services/projects/project';
import { SprintService } from '../services/projects/sprints/sprint.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSprintComponent } from './add-sprint/add-sprint.component';



@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.sass'
})
export class ProjectDashboardComponent implements OnInit, OnDestroy{

  constructor(private userService:UserService, 
    private projectservice: ProjectService, 
    private route: ActivatedRoute, 
    private router: Router,
    private sprintService: SprintService) { }

  
  private modalService = inject(NgbModal);

  
  project_id: string;
  project: Project;
  user:any;
  
  isCollapsed = true;
  
  openAddSprint() {
    const modalRef = this.modalService.open(AddSprintComponent);
    modalRef.componentInstance.project_id = this.project_id;
  }
  ngOnInit() {

    this.user = this.userService.getCurrentUser();
  
    this.route.params.subscribe(params => {
      this.project_id = params['id']
    })

    this.project = this.projectservice.getProject(this.project_id);
    if (!this.project) {
      this.router.navigate(['page-not-found']);
    }
  }

  ngOnDestroy() {
  

  }


}
