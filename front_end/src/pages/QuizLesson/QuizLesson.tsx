import { useAppSelector } from '@hooks/app'
import './QuizLesson.css'
import Menu from '@components/Lesson/Quiz/Menu/Menu'
import Quiz from '@components/Lesson/Quiz/Quiz/Quiz'
import EndScreen from '@components/Lesson/Quiz/EndScreen/EndScreen'

const QuizTest = () => {
    const { gameState } = useAppSelector(state => state.quiz)
    return (
        <div className='quizTest'>
            {gameState === "menu" && <Menu />}
            {gameState === "playing" && <Quiz />}
            {gameState === "finished" && <EndScreen />}
        </div>
    )
}

export default QuizTest
