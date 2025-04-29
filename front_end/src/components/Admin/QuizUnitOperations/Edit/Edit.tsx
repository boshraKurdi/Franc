import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

import actDashUpdateQuizUnit from '@store/dashboard/actquizUnit/actDashUpdateQuizUnit';
import actDashShowQuizUnit from '@store/dashboard/actquizUnit/actDashShowQuizUnit';

type TQuiz = {
    id: number,
    unit_id: number,
    question: string,
    answer_1: string,
    answer_2: string,
    answer_3: string,
    answer_4: string,
    answer_right: string,
}
function Edit(props: { courseId: number, userId: number, setUserEdited: () => void }) {
    const { quiz_unit } = useAppSelector(state => state.dashboard)
    const [question, setQuestion] = useState('');
    const [answer_1, setAnswer_1] = useState('');
    const [answer_2, setAnswer_2] = useState("");
    const [answer_3, setAnswer_3] = useState("");
    const [answer_4, setAnswer_4] = useState("");
    const [answer_right, setAnswerRight] = useState("");
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)
    useEffect(() => {
        dispatch(actDashShowQuizUnit(props.userId!))


    }, [dispatch, props.userId])
    console.log(quiz_unit)
    useEffect(() => {
        if (quiz_unit) {
            setQuestion(quiz_unit?.question)
            setAnswer_1(quiz_unit?.answer_1)
            setAnswer_2(quiz_unit?.answer_2)
            setAnswer_3(quiz_unit?.answer_3)
            setAnswer_4(quiz_unit?.answer_4)
            setAnswerRight(quiz_unit?.answer_right)
        }
    }, [quiz_unit])
    const data: TQuiz = {
        id: props.userId,
        unit_id: props.courseId,
        question: question!,
        answer_1: answer_1!,
        answer_2: answer_2!,
        answer_3: answer_3!,
        answer_4: answer_4!,
        answer_right: answer_right!,
    }
    const navigate = useNavigate()
    const addNewUser = () => {

        dispatch(actDashUpdateQuizUnit(data)).unwrap().then(() => {
            language === 'French' ? toast.success('édité!') : toast.success('تم التعديل!')
            navigate(0)

        })
    }


    return (
        <div className='user-view _add-view'>
            <h1>{language === 'French' ? "Informations de base" : "المعلومات الأساسية"}</h1> "


            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "question" : "السؤال "}</span>
                            <input
                                value={question}
                                type='text'
                                className='form-control'
                                onChange={e => setQuestion(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "réponse 1" : "الاجابة 1"}</span>
                            <input
                                value={answer_1}
                                type='text'
                                className='form-control'
                                onChange={e => setAnswer_1(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "réponse 2" : "الاجابة 2"}</span>
                            <input
                                value={answer_2}
                                type='text'
                                className='form-control'
                                onChange={e => setAnswer_2(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "réponse 3" : "الاجابة 3"}</span>
                            <input
                                value={answer_3}
                                type='text'
                                className='form-control'
                                onChange={e => setAnswer_3(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "réponse 4" : "الاجابة 4"}</span>
                            <input
                                value={answer_4}
                                type='text'
                                className='form-control'
                                onChange={e => setAnswer_4(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "bonne réponse" : "الاجابة الصحيحة "}</span>
                            <input
                                value={answer_right}
                                type='text'
                                className='form-control'
                                onChange={e => setAnswerRight(e.target.value)}
                            />
                        </p>
                    </div>

                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "Ajouter un nouveau niveau" : "اضافة مستوى جديد"}</button>
        </div>
    )
}

export default Edit