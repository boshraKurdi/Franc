import './LessonsList.css'
import LessonCard from "../LessonCard/LessonCard"
import { useAppSelector } from "@hooks/app"
import { TLesson } from '@customtypes/lessonType'
const LessonsList = ({ lessons }: { lessons: TLesson[] }) => {
    const { language } = useAppSelector(state => state.language)
    const Cards = lessons?.map(le => <LessonCard {...le} />)
    return (
        <div className="lessons-grid">

            {lessons?.length ? Cards : language === 'French' ? "Il n'y a pas encore de leçons" : "لم يتم اضافة الدروس بعد"}
        </div>
    )
}

export default LessonsList
