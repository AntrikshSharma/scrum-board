import { AlertService } from './../../services/alertservice/alertservice';
import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SprintService } from '../../services/projects/sprints/sprint.service';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from '../../services/projects/sprints/sprint';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrl: './add-sprint.component.sass'
})
export class AddSprintComponent {

  @Input() project_id: string;
  
  constructor(public activeModal: NgbActiveModal, private sprintService: SprintService, private route:ActivatedRoute, private alerts: AlertService) { }

  title: string = "";
  description: string = "";
  startDate: Date = new Date();
  endDate: Date = new Date();


  createSprint() {

    try {

      if(this.title.length < 3) {
        throw new Error("Title should be atleast 3 characters long");
      }
      if(this.description.length < 10) {
        throw new Error("Description should be atleast 10 characters long");
      }
      if(this.startDate <= new Date()) {
        throw new Error("Start date should be in the future");
      }
      if(this.endDate <= this.startDate) {
        throw new Error("End date should be after start date");
      }
  
      const newSprint = {
        id: 0,
        title: this.title,
        description: this.description,
        start_date: this.startDate.toString(),
        end_date: this.endDate.toString()
      }
  
      this.sprintService.createSprint(this.project_id, newSprint);
      this.activeModal.close();
      this.alerts.success("Sprint " + this.title + " created successfully");
    }
    catch (error) {
      this.alerts.error(error.message);
    }

  }




}
