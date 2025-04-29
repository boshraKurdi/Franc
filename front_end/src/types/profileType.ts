import { TCetrtificate } from "./certificate"

export type TProfile = {
    data: {
        id?: number,
        name?: string,
        email?: string,
        completed_units?: number,
        completed_lessons?: number,
        completed_levels?: number,
        streak_days?: number,
        levels?: [
            {
                "Phonétique française": number
            },
            {
                "Grammaire française": number
            },
            {
                "Conversation en français": number
            },
            {
                "Lecture en français": number
            },
            {
                "Compréhension orale": number
            }
        ],
        rate?: [
            {
                "Phonétique française": number
            },
            {
                "Grammaire française": number
            },
            {
                "Conversation en français": number
            },
            {
                "Lecture en français": number
            },
            {
                "Compréhension orale": number
            }
        ],
        user_rank?: number,
        certificate?: TCetrtificate[]
    }

}