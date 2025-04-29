import Tabs from "@components/Admin/Tabs/Tabs"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { useEffect } from "react"
import './QuizLessonPage.css'
import actGetAllLessons from "@store/lesson/act/actGetAllLesson";
const QuizLevelPage = () => {
    const { lessons } = useAppSelector(state => state.lesson);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actGetAllLessons())
    }, [])
    return (
        <div className="quizLevelPage">
            <Tabs componentName="QuizLesson" array={lessons!} />
        </div>
    )
}

export default QuizLevelPage
