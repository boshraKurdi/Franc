import { useAppSelector } from '@hooks/app'
import './Footer.css'
const Footer = () => {
    const { language } = useAppSelector(state => state.language)
    return (
        <footer>
            <span>QuizFrench</span> {language === 'French' ? "Tous droits réservés" : "كل الحقوق محفوظة"} &copy; 2025
        </footer>
    )
}

export default Footer
