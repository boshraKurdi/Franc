import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import actDashShowBook from '@store/dashboard/actBook/actDashShowBook';
import actDashUpdateBook from '@store/dashboard/actBook/actDashUpdateBook';
import { useNavigate } from 'react-router-dom';


function Edit(props: { userId: number, setUserEdited: () => void }) {
    const { book } = useAppSelector(state => state.dashboard)
    const [title, setTitle] = useState(book?.title);
    const [description, setDescription] = useState(book?.description);
    const [media, setMedia] = useState('');
    const [title_ar, setTitleAra] = useState(book?.title_ar);
    const [description_ar, setDescriptionAra] = useState(book?.description_ar);
    const [price, setPrice] = useState<number | null>(book?.price!);
    const [author, setAuthor] = useState(book?.author);
    const [metaphor, setMetaphor] = useState<null | number>(book?.metaphor!);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const { language } = useAppSelector(state => state.language)
    const addNewUser = () => {
        const formData = new FormData()

        formData.append('title', title as string)
        formData.append('description', description as string)
        formData.append('media', media as string)
        formData.append('title_ar', title_ar as string)
        formData.append('description_ar', description_ar as string)
        formData.append('price', price)
        formData.append('author', author as string)
        formData.append('metaphor', metaphor)
        const data = {
            formData,
            id: props?.userId
        }
        dispatch(actDashUpdateBook(data)).unwrap().then(() => {
            language === 'French' ? toast.success('Modifié!') : toast.success('تم تعديل  !')
            navigate(0)
        })
    }

    useEffect(() => {
        dispatch(actDashShowBook(props.userId))
    }, [dispatch])
    useEffect(() => {
        if (book) {
            setTitle(book.title)
            setTitleAra(book.title_ar)
            setDescription(book.description)
            setDescriptionAra(book.description_ar)
            setAuthor(book.author)
            setPrice(book.price)
            setMetaphor(book.metaphor)

        }
    }, [language, book])

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
                        onChange={e => setMedia(e.target.value)}
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


                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "prix" : "السعر"}</span>
                        <input
                            value={price!}
                            type='text'
                            className='form-control'
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "auteur" : "الكاتب"}</span>
                        <input
                            value={author}
                            type='text'
                            className='form-control'
                            onChange={e => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <span>{language === 'French' ? "prix d'emprunt" : "سعر الاستعارة"}</span>
                        <input
                            value={metaphor!}
                            type='text'
                            className='form-control'
                            onChange={e => setMetaphor(e.target.value)}
                        />
                    </div>


                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "Modifié" : "تعديل"}</button>
        </div>
    )
}

export default Edit