import "./Quiz.css";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/app";
import { actQuizLevel, setGameState, setScore } from "@store/quiz/quizSlice";
import { useParams } from "react-router-dom";
import './Quiz.css'
import ReactAudioPlayer from "react-audio-player";

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState("");
    const { score, quizes, gameState } = useAppSelector(state => state.quiz)
    const { language } = useAppSelector(state => state.language)
    const dispatch = useAppDispatch()

    const { id } = useParams();
    const indx = parseInt(id as string)
    useEffect(() => {
        dispatch(actQuizLevel(indx))

    }, [])


    const chooseOption = (option: string, e: any) => {
        const options = document.querySelectorAll('.ans');
        options.forEach(op => {
            op.classList.remove('active')
        });
        (e.target as Element).classList.add('active');
        setOptionChosen(option);

    };
    const nextQuestion = () => {
        const options = document.querySelectorAll('.ans');
        options.forEach(op => {

            if (op.dataset.choose === quizes?.data[0]?.quiz[currentQuestion].answer_right) {
                op.classList.add('correct');

            } else {
                op.classList.add('wrong');

            }
        });
        // const options = document.querySelectorAll('.ans');

        if (quizes?.data[0]?.quiz[currentQuestion].answer_right == optionChosen) {
            dispatch(setScore(score + 1));

        }
        setTimeout(() => {

            setCurrentQuestion(currentQuestion + 1);
            options.forEach(op => {
                op.classList.remove('active')
                op.classList.remove('correct')
                op.classList.remove('wrong')
            });
        }, 1000);

    };

    const finishQuiz = () => {

        const options = document.querySelectorAll('.ans');
        options.forEach(op => {

            if (op.dataset.choose === quizes?.data[0]?.quiz[currentQuestion].answer_right) {
                op.classList.add('correct');

            } else {
                op.classList.add('wrong');

            }
        });

        if (quizes?.data[0]?.quiz[currentQuestion].answer_right == optionChosen) {
            dispatch(setScore(score + 1));

        }


        setTimeout(() => {
            dispatch(setGameState("finished"));

            options.forEach(op => {
                op.classList.remove('active')
                op.classList.remove('correct')
                op.classList.remove('wrong')
            });
        }, 1000);
    };
    return (
        <div>

            {quizes?.data.length ? <>
                <h1>{language === 'French' ? `${quizes?.data[0]?.title} Quiz` : `اختبار ${quizes?.data[0]?.title_ar} `} </h1>
                <div className="Quiz">
                    {!quizes.data[0].quiz[currentQuestion].media?.length ?
                        <h4>{`${currentQuestion + 1}. ${quizes?.data[0].quiz[currentQuestion].question}`}</h4>
                        :
                        <ReactAudioPlayer controls src={quizes?.data[0].quiz[currentQuestion].media![0]?.original_url!} />
                    }
                    <div className="questions">
                        <button
                            data-choose={quizes?.data[0]?.quiz[currentQuestion].answer_1}
                            className="ans"
                            onClick={(e) => {
                                // chooseOption("optionA");
                                chooseOption(quizes?.data[0]?.quiz[currentQuestion].answer_1!, e)
                            }}
                        >
                            A. {quizes?.data[0]?.quiz[currentQuestion].answer_1}
                        </button>
                        <button
                            className="ans"
                            data-choose={quizes?.data[0]?.quiz[currentQuestion].answer_2}

                            onClick={(e) => {
                                // chooseOption("optionB");
                                chooseOption(quizes?.data[0]?.quiz[currentQuestion].answer_2!, e)

                            }}
                        >
                            {/* {Questions[currentQuestion].optionB} */}
                            B. {quizes?.data[0]?.quiz[currentQuestion].answer_2}

                        </button>
                        <button
                            className="ans"
                            data-choose={quizes?.data[0]?.quiz[currentQuestion].answer_3}

                            onClick={(e) => {
                                // chooseOption("optionC");
                                chooseOption(quizes?.data[0]?.quiz[currentQuestion].answer_3!, e)

                            }}
                        >
                            C. {quizes?.data[0]?.quiz[currentQuestion].answer_3}

                            {/* {Questions[currentQuestion].optionC} */}
                        </button>
                        <button
                            className="ans"
                            data-choose={quizes?.data[0]?.quiz[currentQuestion].answer_4}

                            onClick={(e) => {
                                // chooseOption("optionD");
                                chooseOption(quizes?.data[0]?.quiz[currentQuestion].answer_4!, e)

                            }}
                        >
                            {/* {Questions[currentQuestion].optionD} */}
                            D. {quizes?.data[0]?.quiz[currentQuestion].answer_4}

                        </button>
                    </div>

                    <div className="btns">
                        {currentQuestion == quizes?.data[0]?.quiz.length! - 1 ? (
                            <button onClick={finishQuiz} id="nextQuestion">
                                {language === "French" ? "terminer le quiz" : "انهاء الاختبار"}
                            </button>
                        ) : (
                            <button onClick={nextQuestion} id="nextQuestion">

                                {language === "French" ? " question suivante" : "السؤال التالي"}

                            </button>
                        )}
                    </div>
                </div>
            </> : language === 'French' ? "y a pas encore de quiz" : "لا يوجد اختبار بعد"} </div>
    );
}

export default Quiz;
