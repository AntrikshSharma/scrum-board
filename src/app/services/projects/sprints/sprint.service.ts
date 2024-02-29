import { Injectable } from "@angular/core";
import { Sprint, SPRINTS } from "./sprint";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SprintService {
    
    _sprints: {
        [projectId: string]: Sprint[]
    };
    get sprints() {
        this._sprints = SPRINTS;
        return this._sprints;
    }


    private sprintsSubject = new BehaviorSubject<any>(this.sprints);
    private sprints$ = this.sprintsSubject.asObservable();

    
    getSprints() {
        return this.sprints$;
    }

    createSprint(projectId: string, sprint: Sprint) {
        
        console.log(this.sprints);
        
        if(!this.sprints[projectId]) {
            this.sprints[projectId] = [];
        }
        let new_id:number = this.sprints[projectId].length;
        sprint.id = new_id;
        let newSprintArr = this.sprints[projectId];
        newSprintArr.push(sprint);
        this.sprints[projectId] = newSprintArr;
        this.sprintsSubject.next(this.sprints);
        
        console.log(this.sprints);

    }
}
