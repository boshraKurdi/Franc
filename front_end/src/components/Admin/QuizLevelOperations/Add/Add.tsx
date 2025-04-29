import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';


import actDashAddQuizCourse from '@store/dashboard/actquizCourse/actDashAddQuizCourse';

type TQuiz = {
    course_id: number,
    question: string,
    answer_1: string,
    answer_2: string,
    answer_3: string,
    answer_4: string,
    answer_right: string,
}
function Add(props: { id: number, setUserAdded: () => void }) {
    const [question, setQuestion] = useState('');
    const [answer_1, setAnswer_1] = useState('');
    const [answer_2, setAnswer_2] = useState('');
    const [answer_3, setAnswer_3] = useState('');
    const [answer_4, setAnswer_4] = useState('');
    const [answer_right, setAnswerRight] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)

    const data: TQuiz = {
        course_id: props.id,
        question,
        answer_1,
        answer_2,
        answer_3,
        answer_4,
        answer_right,
    }
    const addNewUser = () => {

        dispatch(actDashAddQuizCourse(data)).unwrap().then(() => {
            language === 'French' ? toast.success('ajouté!') : toast.success('تم اضافة!')

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
                                type='text'
                                className='form-control'
                                onChange={e => setAnswerRight(e.target.value)}
                            />
                        </p>
                    </div>

                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "Ajouter" : "اضافة"}</button>
        </div>
    )
}

export default Add