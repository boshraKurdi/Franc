import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import './Navbar.css'
import Button from "@components/feedback/Button/Button"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { NavLink, useNavigate } from "react-router-dom"
import { changeLanguageToArabic, changeLanguageToFrench } from "@store/language/language"
import Cookie from 'cookie-universal';
import ProfileIcon from '@assets/svgs/profile-user-svgrepo-com.svg?react'
const Header = ({ show, showHandler }: { show: boolean, showHandler: () => void }) => {
    const { language } = useAppSelector(state => state.language)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const turnFrenchHandler = () => {
        dispatch(changeLanguageToFrench())
    }
    const turnArabicHandler = () => {
        dispatch(changeLanguageToArabic())
    }
    const profile = () => {

        navigate('/dashboard/profile')
    }
    const cookie = Cookie()
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className="cont">
                <Navbar.Brand href="#home" className="iconLink">
                    <div className="iconLogo">
                        <div className="icon">
                            <i onClick={showHandler} className={show ? "pi pi-spin pi-cog" : "pi pi-cog"} style={{
                                margin: "-5px 3px",
                                fontSize: "2rem"
                            }}></i>

                        </div>
                        <h3 className="admin-brand">Admin <p>
                            Dashboard</p></h3>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle className="toggle" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto links">
                        <NavLink to="/dashboard/operations">
                            {language === "French" ? "Accueil" : "الرئيسية"}
                        </NavLink>
                        <NavLink to="/dashboard/courses">
                            {language === "French" ? "Cours" : "الكورسات"}
                        </NavLink>
                        <NavLink to="/dashboard/books">
                            {language === "French" ? "Livres" : "الكتب"}
                        </NavLink>
                        <NavDropdown title={language === "French" ? "langue" : "اللغة"} id="basic-nav-dropdown">
                            <NavDropdown.Item className="drop" >
                                <p onClick={turnFrenchHandler}>
                                    {language === "French" ? "French" : "فرنسي"}
                                </p>
                            </NavDropdown.Item>
                            <NavDropdown.Item className="drop">
                                <p onClick={turnArabicHandler}>
                                    {language === "French" ? "arabe" : " عربي"}

                                </p>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                        {cookie.get('token') ?
                            <div onClick={profile} className="prof">
                                <ProfileIcon style={{ width: "30px", height: "30px" }} />
                            </div> :
                            <Button onClick={() => navigate('/login')}>{language === "Arabic" ? "تسجيل الدخول" : "se connecter"}</Button>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
