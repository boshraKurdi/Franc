import { useAppDispatch, useAppSelector } from "@hooks/app";
import { setGameState } from "@store/quiz/quizSlice";
import './Menu.css'
function Menu() {
    // const { gameState, setGameState, userName, setUserName } = useContext(
    //     GameStateContext
    // );
    const { userData } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch()
    return (
        <div className="Menu">
            <label>Your Name:</label>
            <div className="name">{userData?.user.name}</div>
            <button
                onClick={() => {
                    dispatch(setGameState("playing"));
                }}
            >
                Start Quiz
            </button>
        </div>
    );
}

export default Menu;
