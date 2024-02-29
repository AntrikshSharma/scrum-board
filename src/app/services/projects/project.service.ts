import { Injectable } from "@angular/core";
import { Project, PROJECTS } from "./project";
import { BehaviorSubject, map, Observable, of } from "rxjs";
@Injectable({
    providedIn: "root"
})
export class ProjectService {
    
    
    _projects: {
        [project_id:string]: Project
    };
    get projects() {
        this._projects = PROJECTS;
        return this._projects;
    }


    private projectSubject = new BehaviorSubject<any>(this.projects);
    private projects$ = this.projectSubject.asObservable();
    
    constructor() {}

    getProjects(): Observable<Project[]> {
        return this.projects$;
    }   

    getProject(id: string) {
        return this.projects[id];
    }

    createProject( project: Project ) {

        if (this.projects[project.id]) {
            throw new Error("Project with id " + project.id + " already exists");
        }
        this.projects[project.id] = project;
        this.projectSubject.next(this.projects);
    }
    
}