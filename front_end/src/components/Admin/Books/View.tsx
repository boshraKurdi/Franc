import { useEffect } from 'react'
import actDashShowBook from '@store/dashboard/actBook/actDashShowBook';
import { useAppDispatch, useAppSelector } from '@hooks/app';


function View(props: { userId: number }) {
    const { book } = useAppSelector(state => state.dashboard)
    const { language } = useAppSelector(state => state.language)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actDashShowBook(props.userId))
    }, []);




    return (
        <div className='user-view'>
            <h1>Basic Info</h1>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === "French" ? "Image" : " الصورة"}</span>
                            <img src={book?.media[0]?.original_url} />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === "French" ? "titre" : " العنوان"}</span>

                            <span>{book?.title}</span>
                        </p>
                    </div>

                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === "French" ? "titre en arabe" : "  العنوان في العربي "}</span>
                            <span>{book?.title_ar}</span>
                        </p>
                    </div>

                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === "French" ? "description " : "  الوصف "}</span>
                            <span>{book?.description}</span>
                        </p>
                    </div>

                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === "French" ? "description en arabe" : "  الوصف في العربي "}</span>
                            <span>{book?.description_ar}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === "French" ? "auteur" : " الكاتب"}</span>
                            <span>{book?.author}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === "French" ? "prix" : " السعر"}</span>
                            <span>{book?.price}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === "French" ? "prix d'emprunt" : " سعر الاستعارة"}</span>
                            <span>{book?.metaphor}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View