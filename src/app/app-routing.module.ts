import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './services/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SprintComponent } from './project-dashboard/sprint-dashboard/sprint/sprint.component';

const routes: Routes = [

  {path: 'login', component:LoginComponent},
  {path: 'dashboard', canActivate:[AuthGuard], component:DashboardComponent},
  {path: 'projects/:id', canActivate:[AuthGuard], canActivateChild:[AuthGuard], component:ProjectDashboardComponent, children: [
    {path: "sprints", component: SprintComponent }
  ]},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: '**', redirectTo:'page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
