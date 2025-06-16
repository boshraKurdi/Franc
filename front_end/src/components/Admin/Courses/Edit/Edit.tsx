import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import actDashUpdateCourse from '@store/dashboard/actCourse/actDashUpdateCourse';
import actDashShowCourse from '@store/dashboard/actCourse/actDashShowCourse';
import { useNavigate } from 'react-router-dom';


function Edit({ userId }: { userId: number, setUserEdited: () => void }) {
    const { course } = useAppSelector(state => state.dashboard)
    const [title, setTitle] = useState(course?.title);
    const [description, setDescription] = useState(course?.description);
    const [media, setMedia] = useState(course?.media[0]?.original_url);
    const [title_ar, setTitleAra] = useState(course?.title_ar);
    const [description_ar, setDescriptionAra] = useState(course?.description_ar);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const { language } = useAppSelector(state => state.language)
    const addNewUser = () => {
        const formData = new FormData()

        formData.append('title', title!)
        formData.append('description', description!)
        formData.append('media', media!)
        formData.append('title_ar', title_ar!)
        formData.append('description_ar', description_ar!)
        const data = {
            formData,
            id: userId
        }
        dispatch(actDashUpdateCourse(data)).unwrap().then(() => {
            language === 'French' ? toast.success('Modifié avec succès!') : toast.success('تم تعديل الكورس !')
            navigate(0)
        })
    }

    useEffect(() => {
        dispatch(actDashShowCourse(userId))
    }, [dispatch])
    useEffect(() => {
        if (course) {
            setTitle(course.title)
            setTitleAra(course.title_ar)
            setDescription(course.description)
            setDescriptionAra(course.description_ar)
            setMedia(course?.media[0]?.original_url)

        }
    }, [language, course])
    const fileHandler = (e: any) => {
        setMedia(e.target.files[0]);
    }
    return (
        <div className='user-view _add-view'>
            <h1>{language === 'French' ? "Informations de base" : "المعلومات الأساسية"}</h1> "
            <div className='col-sm-12 col-md-6'>
                <span>{language === 'French' ? "Image" : "الصورة"}</span>

                <div style={{ position: "relative" }}>
                    <input
                        type="file"
                        className='form-control'
                        placeholder='Enter Password'
                        onChange={fileHandler}
                    />

                </div>
            </div>

            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "titre" : "العنوان "}</span>
                        <input
                            value={title}

                            type='text'
                            className='form-control'
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "titre en arabe" : "العنوان بالعربي"}</span>
                        <input
                            value={title_ar}

                            type='text'
                            className='form-control'
                            onChange={e => setTitleAra(e.target.value)}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "desctription" : "الوصف "}</span>
                        <input
                            value={description}

                            type='text'
                            className='form-control'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "desctription en arabe" : "الوصف بالعربي"}</span>
                        <input
                            value={description_ar}

                            type='text'
                            className='form-control'
                            onChange={e => setDescriptionAra(e.target.value)}
                        />
                    </div>

                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "Modifié" : "تعديل"}</button>
        </div>
    )
}

export default Edit