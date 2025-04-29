export type TRegAuth =
    {
        status: string,
        message?: string,
        user: {
            name: string,
            email: string,
            // updated_at: string,
            // "created_at": "2025-03-26T13:26:20.000000Z",
            id: number
            ,
            roles?: [
                {
                    id: 1,
                    name: string,
                    // guard_name: "api",
                    // "created_at: "2025-04-09T19:37:32.000000Z",
                    // "updated_at": "2025-04-09T19:37:32.000000Z",
                    // pivot: {
                    //     "model_type": "App\\Models\\User",
                    //     "model_id": 1,
                    //     "role_id": 1
                    // }
                }
            ]
        },

        authorisation: {
            token: string,
            type: string
        }
    }
