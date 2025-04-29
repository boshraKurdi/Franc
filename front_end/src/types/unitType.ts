export type TUnit = {
    id: number,
    title: string,
    description: string,
    title_ar: string,
    description_ar: string,
    course_level_id: number,
    is_locked?: boolean,

}
export type TUnitProps = {
    id?: number,
    level_id?: number,
    title: string,
    description: string,
    title_ar: string,
    description_ar: string,
    course_level_id?: number,
    is_locked?: boolean,
    num?: string,
    number?: string
}