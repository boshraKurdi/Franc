import Tabs from "@components/Admin/Tabs/Tabs"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { useEffect } from "react"
import './QuizUnitPage.css'
import actGetAllUnits from "@store/unit/act/actGetAllUnits";
const QuizLevelPage = () => {
    const { units } = useAppSelector(state => state.unit);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actGetAllUnits())
    }, [])
    return (
        <div className="quizLevelPage">
            <Tabs componentName="QuizUnit" array={units!} />
        </div>
    )
}

export default QuizLevelPage
