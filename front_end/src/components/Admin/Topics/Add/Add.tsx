import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom';
import actDashAddTopic from '@store/dashboard/actTopic/actDashAddTopic';


function Add(props: { setUserAdded: () => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [title_ar, setTitleAra] = useState('');
    const [description_ar, setDescriptionAra] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)

    const { id } = useParams();
    const indx = parseInt(id as string)
    const data = {
        course_id: indx,
        title,
        title_ar,
        description,
        description_ar
    }
    const navigate = useNavigate()
    const addNewUser = () => {

        dispatch(actDashAddTopic(data)).unwrap().then((res) => {
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
                            <span>{language === 'French' ? "desctription" : "الوصف "}</span>
                            <input
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
                                className='form-control'
                                onChange={e => setDescriptionAra(e.target.value)}
                            />
                        </p>
                    </div>





                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "Ajouter un nouveau sujet" : "اضافة محور جديد"}</button>
        </div>
    )
}

export default Add