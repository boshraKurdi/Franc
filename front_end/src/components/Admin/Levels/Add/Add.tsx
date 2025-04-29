import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom';
import actDashAddLevel from '@store/dashboard/actLevel/actDashAddLevel';
import { TLevel } from '@customtypes/levelType';


function Add(props: { setUserAdded: () => void }) {
    const [title, setTitle] = useState('');
    const [number, setNum] = useState<null | number>(null);
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
        description_ar, number
    }
    const navigate = useNavigate()
    const addNewUser = () => {

        dispatch(actDashAddLevel(data as TLevel)).unwrap().then(() => {
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

                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "num de niveau" : "رقم المستوى"}</span>
                            <input
                                type='number'
                                className='form-control'
                                onChange={e => setNum(e.target.value)}
                            />
                        </p>
                    </div>



                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "Ajouter un nouveau niveau" : "اضافة مستوى جديد"}</button>
        </div>
    )
}

export default Add