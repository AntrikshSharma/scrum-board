import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { SprintService } from '../../../services/projects/sprints/sprint.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.sass'
})
export class SprintComponent implements OnInit, OnDestroy, DoCheck{

  constructor(
    private route:  ActivatedRoute,
    private sprintService: SprintService,
  ) {}

  projectId: string;
  projectIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  sprintId: number;
  sprintIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  sprint: any;
  sprintSubs: Subscription;

  ngOnInit() {
    
    this.route.queryParams.subscribe(queryParams => {
      this.sprintId = +queryParams['sprintId'];
      this.sprintIdSubject.next(this.sprintId);
    
    })

    this.route.parent.params.subscribe(
      params => {
        this.projectId = params['id'];
        this.projectIdSubject.next(this.projectId);
      }
    );
    
    this.sprintSubs = this.sprintService.getSprints().subscribe(updatedSprints => {
      
      this.sprint = updatedSprints[this.projectId][this.sprintId];
    });
    this.sprintSubs.unsubscribe();
  }

  private selectSprint(sprintId: number) {

    
  }

  ngDoCheck(): void {

    this.sprintSubs = this.sprintService.getSprints().subscribe(updatedSprints => {
      
      this.sprint = updatedSprints[this.projectId][this.sprintId];
    });
    this.sprintSubs.unsubscribe();
    
  }

  ngOnDestroy() {
  }



}
