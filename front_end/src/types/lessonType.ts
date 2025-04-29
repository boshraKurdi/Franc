import { TVocbulary } from "./vocabularyType"

export type TLesson = {
    id: number,
    title: string,
    unit_id: number,
    content: string,
    title_ar: string
    content_ar: string
    objective: string,
    objective_ar: string,
    video_url: string | null,

    is_locked: string,
    vocabulary: TVocbulary[]

}
export type TLessonProps = {
    id: number,
    title: string,
    unit_id: number,
    content: string,
    title_ar: string
    content_ar: string
    objective: string,
    objective_ar: string,
    video_url: string | null,

    is_locked?: string,
    vocabulary?: [
        {
            id: number,
            lesson_id: number,
            word: string,
            translation: string,
            example_sentence: string,
            audio_url: string | null,
        },
        media: [{
            original_url: string
        }]


    ]
}
export type TLessonData = {
    id?: number,
    title: string,
    unit_id: number,
    content: string,
    title_ar: string
    content_ar: string
    objective: string,
    objective_ar: string,
    video_url: string | null,

}