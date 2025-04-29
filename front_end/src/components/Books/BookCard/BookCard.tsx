import { useAppSelector } from "@hooks/app"
import './BookCard.css'
import Button from "@components/feedback/Button/Button";
import { useNavigate } from "react-router-dom";
import { TBook } from "@customtypes/bookType";
const BookCard = (props: TBook) => {
    const { language } = useAppSelector(state => state.language);
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`${props.id}/show`)} className="bookCard">
            <div className="left">
                <img src={props?.media[0]?.original_url} alt="" />
            </div>
            <div className="right">
                <h3>{language === 'French' ? props.title : props.title_ar}</h3>
                <h4>{props.author}</h4>
                <p>{language === 'French' ? props.description : props.description_ar}</p>
                <p className="price">${props.price}</p>
                <Button onClick={() => navigate(`${props.id}/show`)}>{language === "French" ? "montrer" : "تصفح"}</Button>
            </div>
        </div>
    )
}

export default BookCard
