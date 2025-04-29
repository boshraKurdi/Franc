import './Header.css'
import Navbar from '../Navbar/Navbar';
const Header = ({ show, showHandler }: { show: boolean, showHandler: () => void }) => {
    return (
        <header>
            <Navbar show={show} showHandler={showHandler} />
        </header>
    )
}

export default Header
