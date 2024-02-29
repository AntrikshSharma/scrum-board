
import { ProjectService } from '../../services/projects/project.service';
import { Project } from './../../services/projects/project';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.sass'
})
export class ProjectCardComponent implements OnInit{

    @Input() project:Project;

    constructor(private projectservice: ProjectService) {}
    ngOnInit() {

      
    }

    open()
    {
      console.log(this.project.id + " opened!");
    }


    
}
