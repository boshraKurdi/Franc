import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useParams } from 'react-router-dom';
import { TLesson, TLessonData } from '@customtypes/lessonType';
import actDashAddLesson from '@store/dashboard/actLesson/actDashAddLesson';


function Add(props: { setUserAdded: () => void }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [content_ar, setContentAra] = useState('');
    const [objective_ar, setObjectiveAra] = useState('');
    const [video_url, setVideo] = useState('');
    const [objective, setObjective] = useState('');
    const [title_ar, setTitleAra] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)

    const { idUnit } = useParams();
    const indx = parseInt(idUnit as string)
    const data = {
        unit_id: indx,
        title,
        content,
        content_ar,
        objective_ar,
        objective,
        video_url,
        title_ar,

    }
    const addNewUser = () => {

        dispatch(actDashAddLesson(data as TLesson)).unwrap().then(() => {
            language === 'French' ? toast.success('Nouveau unité ajouté!') : toast.success('تم اضافة وحدة جديدة!')

        })
    }


    return (
        <div className='user-view _add-view'>
            <h1>{language === 'French' ? "Informations de base" : "المعلومات الأساسية"}</h1> "


            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "titre" : "العنوان "}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setTitle(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "titre en arabe" : "العنوان بالعربي"}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setTitleAra(e.target.value)}
                            />
                        </p>
                    </div>


                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "contenu" : "المحتوى"}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setContent(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "contenu en arabe" : "المحتوى بالعربي"}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setContentAra(e.target.value)}
                            />
                        </p>
                    </div>

                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "Objective" : "الهدف"}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setObjective(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "Objective en arabe" : "الهدف بالعربي"}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setObjectiveAra(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "lien de la leçon" : "رابط الدرس"}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setVideo(e.target.value)}
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