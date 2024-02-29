import { Component, Input } from '@angular/core';
import { Task } from '../../services/projects/tasks/tasks';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass'
})
export class TaskComponent {

  @Input() task: Task;

  constructor() { }

  ngOnInit() {
  }
}
