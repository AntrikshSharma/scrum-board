interface comment {
    user: string;
    comment: string;
    date: string;
}

export interface Task {
    
    id: number;
    title: string;
    description: string;
    date: string;
    status: 'NEW' | 'IN-PROGRESS' | 'COMPLETED' | 'BLOCKED';
    users: string[];
    comments: comment[];
}

export const TASKS: {
    [projectId: string]: {
        [sprintId: number]: Task[]
    }
} = {
    "project-1": {
        0: [
            {
                id:0,
                title: "Task 1",
                description: "Some description for Task 1",
                date: "2024-02-16",
                status: "COMPLETED",
                users: ["antriksh", "ojas"],
                comments:[{user: "antriksh", comment: "This is a comment", date: "2024-02-16"}]

            },
            {
                id:1,
                title: "Task 2",
                description: "Some description for Task 2",
                date: "2024-02-16",
                status: "IN-PROGRESS",
                users: ["antriksh", "ojas"],
                comments:[]
            },
            {
                id:2,
                title: "Task 3",
                description: "Some description for Task 3",
                date: "2024-02-16",
                status: "IN-PROGRESS",
                users: ["antriksh", "ojas"],
                comments:[]

            },
            {
                id:3,
                title: "Task 4",
                description: "Some description for Task 4",
                date: "2024-02-16",
                status: "BLOCKED",
                users: ["antriksh", "ojas"],
                comments:[]
            },
            {
                id:4,
                title: "Task 5",
                description: "Some description for Task 5",
                date: "2024-02-01",
                status: "NEW",
                users: ["ojas", "antriksh"],
                comments:[]
            },
            {
                id:5,
                title: "Task 6",
                description: "Some description for Task 6",
                date: "2024-02-01",
                status: "NEW",
                users: ["antriksh", "ojas"],
                comments:[]
            },
            {
                id:6,
                title: "Task 7",
                description: "Some description for Task 7",
                date: "2024-02-16",
                status: "NEW",
                users: ["antriksh", "ojas"],
                comments:[]
            },
            {
                id:7,
                title: "Task 8",
                description: "Some description for Task 8",
                date: "2024-02-16",
                status: "NEW",
                users: ["antriksh", "ojas"],
                comments:[]
            }
        ],
            
        1: [
            {
                id:0,
                title: "Task 1",
                description: "Some description for Task 3",
                date: "2024-02-16",
                status: "NEW",
                users: ["rugved", "pranav"],
                comments:[]
            },
            {
                id:1,
                title: "Task 2",
                description: "Some description for Task 4",
                date: "2024-02-16",
                status: "NEW",
                users: ["rugved", "pranav"],
                comments:[]
            }
        ]
    }
}


