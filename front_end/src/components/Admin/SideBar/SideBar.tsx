import { NavLink, useNavigate } from 'react-router-dom'
import './SideBar.css'
import Logo from '@components/common/Logo/Logo'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import Button from '@components/feedback/Button/Button'
import Cookie from 'cookie-universal'
import { confirmDialog } from 'primereact/confirmdialog'
import { actLogout, authLogout } from '@store/auth/authSlice'
const SideBar = ({ show, showHandler }: { show: boolean, showHandler: () => void }) => {
    const { userData } = useAppSelector(state => state.auth)
    const { language } = useAppSelector(state => state.language)
    const dispatch = useAppDispatch()
    const cookie = Cookie()

    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch(actLogout()).unwrap()
            .then(() => {
                navigate('/')
                cookie.remove('token')
                dispatch(authLogout())
            })
    }
    const accept = () => {
        logoutHandler();
    }

    const confirm = () => {
        confirmDialog({
            message: language === "French" ? 'Voulez-vous vous déconnecter ?' : "هل أنت متأكد أنك تود تسجيل الخروج؟",
            acceptLabel: language === "French" ? "oui" : "نعم",
            rejectLabel: language === "French" ? "non" : "لا",
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            // reject
        });
    };
    return (
        <>

            {<div className={show ? 'side' : "side hide"}>
                <i onClick={showHandler} className='pi pi-times-circle'></i>
                <Logo />
                <div className="details">
                    <h4>{userData?.user.name}</h4>
                    <p className='email'>{userData?.user.email}</p>
                </div>

                <div className="links-menu">
                    <div className='menu-item'><NavLink to={'operations'}><i className='pi pi-clipboard'></i>{language === "French" ? "Cours" : "الكورسات "}</NavLink></div>
                    <div className='menu-item'><NavLink to={'books'}><i className='pi pi-book'></i>{language === "French" ? "Livres" : "الكتب"}</NavLink></div>
                    <div className='menu-item'><NavLink to={'quiz_course'}><i className='pi pi-pen-to-square'></i>{language === "French" ? "Test de niveau" : "اختبار تحديد المستوى"}</NavLink></div>
                    <div className='menu-item'><NavLink to={'quiz_unit'}><i className='pi pi-file-edit'></i>{language === "French" ? "quiz d'unité" : "اختبارات الوحدة"}</NavLink></div>
                    <div className='menu-item'><NavLink to={'quiz_lesson'}>{language === "French" ? "quiz d'leçon" : "اختبارات  الدرس"}<i className='pi pi-file'></i></NavLink></div>
                    <div className='menu-item'><NavLink to={'states'}>{language === "French" ? "Statistiques" : "الاحصائيات"}<i className='pi pi-chart-line'></i></NavLink></div>
                    <div className='menu-item'><NavLink to={'payments'}>{language === "French" ? "Paiements" : "المدفوعات"}<i className='pi pi-wallet'></i></NavLink></div>
                    <div className='menu-item'><NavLink to={'profile'}>{language === "French" ? "Paramètres" : "الاعدادات"}<i className='pi pi-wrench'></i></NavLink></div>

                    <div className="btns">
                        <Button onClick={confirm} >{language === "French" ? "déconnexion" : "تسجيل الخروج"}</Button>

                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default SideBar
