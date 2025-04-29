export type TBook = {
    id: number,
    title: string,
    description: string,
    title_ar: string,
    description_ar: string,
    author: string,
    price: number,
    metaphor: number,
    media: [
        {

            original_url: string,
        }
    ]
}