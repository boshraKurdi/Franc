export type TVocData = {
    word: string,
    translation: string,
    example_sentence: string
    media: string
}
export type TVoc = {
    word: string,
    translation: string,
    example_sentence: string
    media: string,
    lesson_id: number
}
export type TVocbulary = {
    audio_url: null | string,
    example_sentence: string,
    id: number,
    // lesson?: { id: 13, title: 'Leçon 1 de Les voyelles nasales', unit_id: 4, content: 'Contenu de la leçon 1 pour Les voyelles nasales', title_ar: 'الدرس 1 من حروف العلة الأنفية', … }
    lesson_id?: number
    media
    : [{
        original_url: string

    }]
    translation: string
    word: string
}