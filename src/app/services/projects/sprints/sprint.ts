export interface Sprint {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
}

export const SPRINTS: {
    [projectId: string] : Sprint[]
} = { "project-1": [ {
            id: 0,
            title: "Sprint 1",
            description: "Some description for Sprint 1",
            start_date: "2024-02-01",
            end_date: "2024-02-15"
        },
        {
            id: 1,
            title: "Sprint 2",
            description: "Some description for Sprint 2",
            start_date: "2024-02-16",
            end_date: "2024-02-29"
        }
    ]
}