export type TState = {
    total_users: number,
    active_today: number,
    active_week: number,
    active_month: number,
    total_courses: number,
    total_units: number,
    total_lessons: number,
    total_tests: number,
    level_tests: number,
    unit_tests: number,
    lesson_tests: number,
    course_completion: [
        {
            course: string,
            completed_users: number
        },
        {
            course: string,
            completed_users: number
        },
        {
            course: string,
            completed_users: number
        },
        {
            course: string,
            completed_users: number
        },
        {
            course: string,
            completed_users: number
        }
    ],
    inactive_users: number,
    average_progress: number,
    get_daily_tests_stats: [
        {
            x: string,
            y: number
        },
        {
            x: string,
            y: number
        },
        {
            x: string,
            y: number
        }
    ],
    get_user_grow_th_per_month: [
        {
            x: string,
            y: number
        }
    ]
}
export type TLineProps = {
    label: string | null,
    data: number[] | null,
    labels: string[] | null
}
export type TPieProps = {
    data: number[] | null,
    labels: string[] | null
}