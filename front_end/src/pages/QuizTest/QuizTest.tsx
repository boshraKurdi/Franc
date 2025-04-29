import { useAppSelector } from '@hooks/app'
import './QuizTest.css'
import Menu from '@components/Quiz/Menu/Menu'
import Quiz from '@components/Quiz/Quiz/Quiz'
import EndScreen from '@components/Quiz/EndScreen/EndScreen'

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
