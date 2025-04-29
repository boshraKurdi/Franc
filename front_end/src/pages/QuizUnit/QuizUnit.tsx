import { useAppSelector } from '@hooks/app'
import './QuizUnit.css'
import Menu from '@components/Unit/Quiz/Menu/Menu'
import Quiz from '@components/Unit/Quiz/Quiz/Quiz'
import EndScreen from '@components/Unit/Quiz/EndScreen/EndScreen'

const QuizUnit = () => {
    const { gameState } = useAppSelector(state => state.quiz)
    return (
        <div className='quizTest'>
            {gameState === "menu" && <Menu />}
            {gameState === "playing" && <Quiz />}
            {gameState === "finished" && <EndScreen />}
        </div>
    )
}

export default QuizUnit
