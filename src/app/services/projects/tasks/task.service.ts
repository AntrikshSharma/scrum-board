import { Injectable } from "@angular/core";
import { Task, TASKS } from "./tasks";
import { BehaviorSubject, map } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class TaskService {

    _tasks: {
        [projectId: string]: {
            [sprintId: number]: Task[]
        }
    };
    get tasks() {
        this._tasks = TASKS;
        return this._tasks;
    }

    private taskSubject = new BehaviorSubject<any>(this.tasks);
    private tasks$ = this.taskSubject.asObservable();

    getTasks(projectId: string, sprintId: number) {
        return this.tasks$.pipe(map(
            (tasks) => {
                if (!tasks) { return []; }
                if (!tasks[projectId]) { return []; }
                if( !tasks[projectId][sprintId]) { return []; }
                else { return tasks[projectId][sprintId]; }
            }
        ));
    }

    updateTask(projectId: string, sprintId: number, task: Task) {

        this.tasks[projectId][sprintId] = this.tasks[projectId][sprintId].map(
            (t) => {
                if (t.id === task.id) {
                    return task;
                }
                return t;
            }
        );
        this.taskSubject.next(this.tasks);
    }

    addTask(projectId:string, sprintId:number, taks:Task)
    {

        if(!this.tasks[projectId]) {
            this.tasks[projectId] = {};
        }
        
        if(!this.tasks[projectId][sprintId]) {
            this.tasks[projectId][sprintId] = [];
        }
        
        taks.id = this.tasks[projectId][sprintId].length - 1;
        this.tasks[projectId][sprintId].push(taks);
        this.taskSubject.next(this.tasks);
    }


}