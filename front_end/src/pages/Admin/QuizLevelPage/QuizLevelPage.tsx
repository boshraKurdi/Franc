import Tabs from "@components/Admin/Tabs/Tabs"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { actGetCourses } from "@store/course/courseSlice";
import { useEffect } from "react"
import './QuizLevelPage.css'
const QuizLevelPage = () => {
    const { courses } = useAppSelector(state => state.course);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actGetCourses())
    }, [])
    return (
        <div className="quizLevelPage">
            <Tabs componentName="QuizLevel" array={courses!} />
        </div>
    )
}

export default QuizLevelPage
