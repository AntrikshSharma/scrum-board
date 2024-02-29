export interface Project {

    id: string;
    title: string;
    description: string;
    managers: string[];
    members: string[];
}



export const PROJECTS:{
    [project_id:string]  : Project
} =  {

    "project-1":{
        id: "project-1",
        title: "Project 1",
        description: "Some description for Project 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida nisi. Nulla facilisi. Integer at ipsum non lacus viverra vestibulum. Phasellus at libero vel ipsum malesuada rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut gravida nisi. Nulla facilisi. Integer at ipsum non lacus viverra vestibulum. Phasellus at libero vel ipsum malesuada rhoncus.",
        managers: ['antriksh', 'ojas'],
        members: ['rugved', 'pranav']
    },

    "project-2":{
        id: "project-2",
        title: "Project 2",
        description: "Some description for Project 2",
        managers: ['antriksh'],
        members: ['rugved', 'pranav', 'ojas']
    },
    "project-3":{
        id: "project-3",
        title: "Project 3",
        description: "Some description for Project 3",
        managers: ['rugved', 'pranav'],
        members: ['antriksh', 'ojas']
    },
    "project-4":{
        id: "project-4",
        title: "Project 4",
        description: "Some description for Project 4",
        managers: ['ojas'],
        members: ['rugved', 'pranav']
    },
    "project-5":{
        id: "project-5",
        title: "Project 5",
        description: "Some description for Project 5",
        managers: ['pranav'],
        members: ['rugved', 'ojas']
    },
    "project-6":{
        id: "project-6",
        title: "Project 6",
        description: "Some description for Project 6",
        managers: ['rugved'],
        members: ['antriksh', 'pranav']
    },
    "project-7":{
        id: "project-7",
        title: "Project 7",
        description: "Some description for Project 7",
        managers: ['rugved', 'pranav'],
        members: ['antriksh', 'ojas']
    },
    "project-8":{
        id: "project-8",
        title: "Project 8",
        description: "Some description for Project 8",
        managers: ['antriksh', 'ojas'],
        members: ['rugved', 'pranav']
    },
    "project-9":{
        id: "project-9",
        title: "Project 9",
        description: "Some description for Project 9",
        managers: ['antriksh'],
        members: ['rugved', 'pranav', 'ojas']
    },
    "project-10":{
        id: "project-10",
        title: "Project 10",
        description: "Some description for Project 10",
        managers: ['rugved', 'pranav'],
        members: ['antriksh', 'ojas']
    }

}



