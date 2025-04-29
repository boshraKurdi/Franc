import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom';
import actDashAddLevel from '@store/dashboard/actLevel/actDashAddLevel';
import { TLevel } from '@customtypes/levelType';
import actDashAddUnit from '@store/dashboard/actUnit/actDashAddUnit';
import { TUnit, TUnitProps } from '@customtypes/unitType';

export type TData = {
    level_id: number,
    title: string,
    title_ar: string,
    description: string,
    description_ar: string,
    number: number | null | string
}
function Add(props: { setUserAdded: () => void }) {
    const [title, setTitle] = useState('');
    const [number, setNum] = useState<null | number | string>(null);
    const [description, setDescription] = useState('');
    const [title_ar, setTitleAra] = useState('');
    const [description_ar, setDescriptionAra] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)

    const { idLevel } = useParams();
    const indx = parseInt(idLevel as string)

    const data: TData = {
        level_id: indx,
        title,
        title_ar,
        description,
        description_ar,
        number
    }
    const addNewUser = () => {

        dispatch(actDashAddUnit(data)).unwrap().then(() => {
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
                            <span>{language === 'French' ? "num de unité" : "رقم الوحدة"}</span>
                            <input
                                type='number'
                                className='form-control'
                                onChange={e => setNum(e.target.value)}
                            />
                        </p>
                    </div>



                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "Ajouter" : "اضافة "}</button>
        </div>
    )
}

export default Add