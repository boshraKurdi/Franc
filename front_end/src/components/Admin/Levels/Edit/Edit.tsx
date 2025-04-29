import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useParams } from 'react-router-dom';
import actDashUpdateLevel from '@store/dashboard/actLevel/actDashUpdateLevel';
import { TLevel } from '@customtypes/levelType';
import actDashShowLevel from '@store/dashboard/actLevel/actDashShowLevel';


function Edit(props: { userId: number, setUserEdited: () => void }) {
    const { level } = useAppSelector(state => state.dashboard)
    const [title, setTitle] = useState(level?.title);
    const [number, setNum] = useState(level?.number);
    const [description, setDescription] = useState(level?.description);
    const [title_ar, setTitleAra] = useState(level?.title_ar);
    const [description_ar, setDescriptionAra] = useState(level?.description_ar);
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
        description_ar, number
    }
    const addNewUser = () => {

        dispatch(actDashUpdateLevel(data as TLevel)).unwrap().then(() => {
            language === 'French' ? toast.success('édité!') : toast.success('تم التعديل!')

        })
    }
    useEffect(() => {
        dispatch(actDashShowLevel(props.userId))
    }, [dispatch])
    useEffect(() => {
        if (level) {
            setTitle(level.title)
            setTitleAra(level.title_ar)
            setDescription(level.description)
            setDescriptionAra(level.description_ar)
            setNum(level.number)
        }
    }, [language, level])
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
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "num de niveau" : "رقم المستوى"}</span>
                            <input
                                type='number'
                                value={number}
                                className='form-control'
                                onChange={e => setNum(e.target.value)}
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