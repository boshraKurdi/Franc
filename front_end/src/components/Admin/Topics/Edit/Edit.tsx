import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useParams } from 'react-router-dom';
import actDashUpdateTopic from '@store/dashboard/actTopic/actDashUpdateTopic';
import actDashShowTopic from '@store/dashboard/actTopic/actDashShowTopic';
import { TTopic } from '@customtypes/topicType';


function Edit(props: { userId: number, setUserEdited: () => void }) {
    const { topic } = useAppSelector(state => state.dashboard)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [title_ar, setTitleAra] = useState("");
    const [description_ar, setDescriptionAra] = useState("");
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)
    const { id } = useParams();
    const indx = parseInt(id as string)
    const data = {
        id: props.userId,
        course_id: indx,
        title,
        title_ar,
        description,
        description_ar
    }
    useEffect(() => {
        dispatch(actDashShowTopic(props.userId))
    }, [dispatch])
    useEffect(() => {
        if (topic) {
            setTitle(topic.title)
            setTitleAra(topic.title_ar)
            setDescription(topic.description)
            setDescriptionAra(topic.description_ar)
        }
    }, [language, topic])
    const addNewUser = () => {

        dispatch(actDashUpdateTopic(data as TTopic)).unwrap().then(() => {
            language === 'French' ? toast.success('Nouveau cours ajouté!') : toast.success('تم اضافة كورس جديد!')

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
                                value={title}

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
                            <span>{language === 'French' ? "desctription" : "الوصف "}</span>
                            <input
                                value={description}
                                type='text'
                                className='form-control'
                                onChange={e => setDescription(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "desctription en arabe" : "الوصف بالعربي"}</span>
                            <input
                                type='text'
                                value={description_ar}
                                className='form-control'
                                onChange={e => setDescriptionAra(e.target.value)}
                            />
                        </p>
                    </div>





                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "modifier " : "تعديل "}</button>
        </div>
    )
}

export default Edit