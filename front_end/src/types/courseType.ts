export type TCourse = {
    title: string,
    id: number,
    description: string,
    title_ar: string,
    description_ar: string,
    buttonLevelQuiz: boolean,
    levels: [{
        id: number,
        title: string,
        description: string,
        title_ar: string,
        description_ar: string,
        pivot: {
            course_id: number,
            level_id: number
        }
    }]
    media: [{
        id: number,
        original_url: string
    }]
    topics: [
        {
            id: number,
            course_id: number,
            title: string,
            description: string,
            title_ar: string,
            description_ar: string,
        }

    ]
}