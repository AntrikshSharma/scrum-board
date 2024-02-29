import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SprintService } from '../../services/projects/sprints/sprint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/projects/project.service';
import { UserService } from '../../services/user/user.service';
import { Sprint } from '../../services/projects/sprints/sprint';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alertservice/alertservice';

@Component({
  selector: 'app-sprint-dashboard',
  templateUrl: './sprint-dashboard.component.html',
  styleUrl: './sprint-dashboard.component.sass'
})
export class SprintDashboardComponent implements OnInit, OnDestroy{
  
  @Input('projectId') project_id: string;

  constructor(private alert:AlertService, private sprintService: SprintService, private router: Router, private projectService: ProjectService, private userService: UserService, private route: ActivatedRoute) { }  

  sprints: Sprint[];
  sprintSubs: Subscription;
  selectedSprint: Sprint;
  noSprints: boolean = false;

  getIDs(obj: Sprint[]) {
    
    let ids = [];
    for(let i=0; i<obj.length; i++) {
      ids.push(i);
    }
    return ids;

  }

  getSprintTitle(sprintId: number) {
    return this.sprints[sprintId].title;
  }

  selectSprint(sprintId: number) {
    this.router.navigate(['sprints'], {relativeTo: this.route, queryParams: {sprintId: sprintId}, queryParamsHandling: ''});
  }


  ngOnInit() {
    
    this.sprintSubs = this.sprintService.getSprints().subscribe(updatedSprints => {
      
      if(!updatedSprints || !updatedSprints[this.project_id] || updatedSprints[this.project_id].length === 0) {
        this.alert.warn("No sprints found for this project");
        this.noSprints = true;

      }
      else {
        this.noSprints = false;
        this.sprints = updatedSprints[this.project_id];
        this.selectedSprint = this.sprints[0];
      }

    });
  }

  ngOnDestroy() {
    
    this.sprintSubs.unsubscribe();

  }


}
