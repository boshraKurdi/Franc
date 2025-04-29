import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom';

import actDashUpdateLesson from '@store/dashboard/actLesson/actDashUpdateLesson';
import { TLessonData } from '@customtypes/lessonType';
import actDashShowLesson from '@store/dashboard/actLesson/actDashShowLesson';


function Edit(props: { userId: number, setUserEdited: () => void }) {
    const { lesson } = useAppSelector(state => state.dashboard)
    const [title, setTitle] = useState(lesson?.title);
    const [content, setContent] = useState(lesson?.content);
    const [content_ar, setContentAra] = useState(lesson?.content_ar);
    const [objective_ar, setObjectiveAra] = useState(lesson?.objective_ar);
    const [video_url, setVideo] = useState(lesson?.video_url);
    const [objective, setObjective] = useState(lesson?.objective);
    const [title_ar, setTitleAra] = useState(lesson?.title_ar);
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)

    const { idLevel } = useParams();
    const indx = parseInt(idLevel as string)
    const data = {
        id: props.userId,
        unit_id: indx,
        title,
        content,
        content_ar,
        objective_ar,
        objective,
        video_url,
        title_ar,

    }
    const navigate = useNavigate()
    const addNewUser = () => {

        dispatch(actDashUpdateLesson(data as TLessonData)).unwrap().then(() => {
            language === 'French' ? toast.success('modifier!') : toast.success('تم التعديل!')
            navigate(0)

        })
    }
    useEffect(() => {
        dispatch(actDashShowLesson(props.userId))
    }, [dispatch])
    useEffect(() => {
        if (lesson) {
            setContent(lesson.content)
            setContentAra(lesson.content_ar)
            setObjective(lesson.objective)
            setObjectiveAra(lesson.objective_ar)
            setVideo(lesson.video_url)
            setTitle(lesson.title)
            setTitleAra(lesson.title_ar)
        }
    }, [language, lesson])

    return (
        <div className='user-view _add-view'>
            <h1>{language === 'French' ? "Informations de base" : "المعلومات الأساسية"}</h1> "


            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "titre" : "العنوان "}</span>
                            <input
                                value={title}
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
                                value={title_ar}

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
                                value={content}

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
                                value={content_ar}

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
                                value={objective}

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
                                value={objective_ar}

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
                                value={video_url!}
                                type='text'
                                className='form-control'
                                onChange={e => setVideo(e.target.value)}
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