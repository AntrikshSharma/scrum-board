import { ProjectFormDirective } from './projectform.directive';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { Component, ComponentFactoryResolver, ComponentRef, HostListener, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProjectService } from '../services/projects/project.service';
import { Subscription, filter, map } from 'rxjs';
import { CreateProjectComponent } from './create-project/create-project.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass',
  providers: [ProjectFormDirective]
})
export class DashboardComponent implements OnInit, OnDestroy{

  @ViewChild(ProjectFormDirective) createProjectForm: ProjectFormDirective;
  
  constructor(private authService: AuthService, 
              private userService: UserService, 
              private projectService: ProjectService,
              private router:Router,
              private componentFactory: ComponentFactoryResolver) {}

  
  user:{id:string, name:string, role:string};
  projects:any;
  private projectsSubscription:Subscription;
  private component: ComponentRef<CreateProjectComponent>;
  modalOpen:boolean = false;

  ngOnInit() {

    this.user = this.userService.getCurrentUser();

    this.projectsSubscription = this.projectService.getProjects().subscribe(
      updatedProjects => {
        for (const projectid in updatedProjects) {
          if(!(updatedProjects[projectid].managers.includes(this.user.id) || updatedProjects[projectid].members.includes(this.user.id))){
            delete updatedProjects[projectid];
          }
        }
        this.projects = updatedProjects;
      }
    )

  }

  logout(){
    this.authService.logout();
  }


  openModal() {
    
    const componentRefFactory = this.componentFactory.resolveComponentFactory(CreateProjectComponent);
    const viewContainerRef = this.createProjectForm.ViewContainerRef;
    viewContainerRef.clear();
    this.component = viewContainerRef.createComponent<CreateProjectComponent>(componentRefFactory);
    this.modalOpen = true;

    this.component.instance.close.subscribe(() => {
      this.closeModal();
    })
  }

  openProject(id:string){
    this.router.navigate(['projects', id]);
  }


  closeModal() {
    this.component.destroy();
    this.modalOpen = false;
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }

  ngOnDestroy(){
    this.projectsSubscription.unsubscribe();
  }
}
