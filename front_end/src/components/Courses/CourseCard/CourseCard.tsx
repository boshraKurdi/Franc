import { useAppSelector } from "@hooks/app"
import './CourseCard.css'
import Button from "@components/feedback/Button/Button";
import { TCourses } from "@customtypes/coursesType";
import { useNavigate } from "react-router-dom";
const CourseCard = (props: TCourses) => {
    const { language } = useAppSelector(state => state.language);
    const navigate = useNavigate()
    return (
        <div className="courseCard">
            <div className="left">
                <img src={props?.media[0]?.original_url} alt="" />
            </div>
            <div className="right">
                <h3>{language === 'French' ? props.title : props.title_ar}</h3>
                <p>{language === 'French' ? props.description : props.description_ar}</p>
                <Button onClick={() => navigate(`${props.id}/show`)}>{language === "French" ? "montrer" : "تصفح"}</Button>
            </div>
        </div>
    )
}

export default CourseCard
