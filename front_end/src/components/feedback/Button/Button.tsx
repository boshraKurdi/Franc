import { TButton } from '@customtypes/buttonType'
import './Button.css'
const Button = ({ children, style, onClick, disabled, className }: TButton) => {
    return (
        <button disabled={disabled} className={`main-btn ${className}`} style={style} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
