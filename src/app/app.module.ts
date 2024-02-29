import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgComponentOutlet } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavDashboardComponent } from './navbar/nav-dashboard/nav-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectCardComponent } from './dashboard/project-card/project-card.component';
import { CreateProjectComponent } from './dashboard/create-project/create-project.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import { ProjectFormDirective } from './dashboard/projectform.directive';
import { SprintDashboardComponent } from './project-dashboard/sprint-dashboard/sprint-dashboard.component';
import { AddSprintComponent } from './project-dashboard/add-sprint/add-sprint.component';
import { SprintComponent } from './project-dashboard/sprint-dashboard/sprint/sprint.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskComponent } from './task-board/task/task.component';
import { TaskInfoComponent } from './task-board/task-info/task-info.component';
import { AddTaskComponent } from './task-board/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    NavDashboardComponent,
    ProjectCardComponent,
    CreateProjectComponent,
    ProjectFormDirective,
    ProjectDashboardComponent,
    PageNotFoundComponent,
    SprintDashboardComponent,
    AddSprintComponent,
    SprintComponent,
    TaskBoardComponent,
    TaskComponent,
    TaskInfoComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    CommonModule,
    NgComponentOutlet,
    NgbCollapseModule,
    NgbToastModule,
    NgbAlert
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
