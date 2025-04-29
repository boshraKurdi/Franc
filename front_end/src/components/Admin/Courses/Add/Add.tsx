import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import actDashAddCourses from '@store/dashboard/actCourse/actDashAddCourse';


function Add(props: { setUserAdded: () => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState('');
    const [title_ar, setTitleAra] = useState('');
    const [description_ar, setDescriptionAra] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)
    const fileHandler = (e: any) => {
        setMedia(e.target.files[0]);
    }
    const addNewUser = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('media', media)
        formData.append('title_ar', title_ar)
        formData.append('description_ar', description_ar)
        dispatch(actDashAddCourses(formData)).unwrap().then(() => {
            language === 'French' ? toast.success('Nouveau cours ajouté!') : toast.success('تم اضافة كورس جديد!')

        })
    }


    return (
        <div className='user-view _add-view'>
            <h1>{language === 'French' ? "Informations de base" : "المعلومات الأساسية"}</h1> "
            <div className='col-sm-12 col-md-6'>
                <p >
                    <span>{language === 'French' ? "Image" : "الصورة"}</span>

                    <div style={{ position: "relative" }}>
                        <input
                            name="media"
                            type="file"
                            className='form-control'
                            placeholder='Enter Password'
                            onChange={fileHandler}
                        />

                    </div>
                </p>
            </div>

            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "titre" : "العنوان "}</span>
                        <input
                            type='text'
                            className='form-control'
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "titre en arabe" : "العنوان بالعربي"}</span>
                        <input
                            type='text'
                            className='form-control'
                            onChange={e => setTitleAra(e.target.value)}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "desctription" : "الوصف "}</span>
                        <input
                            type='text'
                            className='form-control'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "desctription en arabe" : "الوصف بالعربي"}</span>
                        <input
                            type='text'
                            className='form-control'
                            onChange={e => setDescriptionAra(e.target.value)}
                        />
                    </div>





                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "Ajouter un nouveau cours" : "اضافة كورس جديد"}</button>
        </div>
    )
}

export default Add