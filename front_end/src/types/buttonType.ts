import { CSSProperties } from "react"

export type TButton = {
    children: React.ReactNode,
    className?: string,
    style?: CSSProperties,
    onClick?: () => void,
    disabled?: boolean
}