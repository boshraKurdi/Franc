import { CSSProperties } from "react";

export type TInput = {
    value?: string,
    type: string,
    placeholder: string,
    required?: boolean,
    style?: CSSProperties,
    reg?: any,
    onChange?: (e: any) => void
}