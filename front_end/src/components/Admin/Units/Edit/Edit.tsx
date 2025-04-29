import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useParams } from 'react-router-dom';

import { TUnitProps } from '@customtypes/unitType';
import actDashUpdateUnit from '@store/dashboard/actUnit/actDashUpdateUnit';
import actDashShowUnit from '@store/dashboard/actUnit/actDashShowUnit';


function Edit(props: { userId: number, setUserEdited: () => void }) {
    const { unit } = useAppSelector(state => state.dashboard)
    const [title, setTitle] = useState(unit?.title);

    const [number, setNum] = useState<string | undefined | number>(unit?.number);
    const [description, setDescription] = useState(unit?.description);
    const [title_ar, setTitleAra] = useState(unit?.description_ar);
    const [description_ar, setDescriptionAra] = useState(unit?.description_ar);
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)

    const { idLevel } = useParams();
    const indx = parseInt(idLevel as string)
    const data = {
        id: props.userId,
        level_id: indx,
        title,
        title_ar,
        description,
        description_ar, number
    }
    const addNewUser = () => {

        dispatch(actDashUpdateUnit(data as TUnitProps)).unwrap().then(() => {
            language === 'French' ? toast.success('modifier!') : toast.success('تم التعديل!')

        })
    }

    useEffect(() => {
        dispatch(actDashShowUnit(props.userId))
    },
        [dispatch])
    useEffect(() => {
        if (unit) {
            setTitle(unit.title)
            setTitleAra(unit.title_ar)
            setDescription(unit.description)
            setDescriptionAra(unit.description_ar)
            setNum(unit.number)
        }
    }, [language, unit])
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
                                value={description_ar}

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
                                value={number}

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

export default Edit