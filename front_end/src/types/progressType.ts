export type TProgress = {
    message: string,
    data: {
        level: number,
        status?: string,
        level_id: number
        certificate: {
            id: number
        }
    }
}
