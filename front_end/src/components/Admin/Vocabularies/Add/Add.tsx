import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useParams } from 'react-router-dom';
import actDashAddVoc from '@store/dashboard/actVocabulary/actDashAddVoc';


function Add(props: { setUserAdded: () => void }) {
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [media, setMedia] = useState('');
    const [example_sentence, setExample] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)
    const fileHandler = (e: any) => {
        // setAudioFile(URL.createObjectURL(e.target.files[0]));
        setMedia(e.target.files[0]);
    }
    const { idLesson } = useParams()
    const addNewUser = () => {
        const formData = new FormData()
        formData.append('lesson_id', idLesson!)
        formData.append('word', word)
        formData.append('translation', translation)
        formData.append('media', media)
        formData.append('example_sentence', example_sentence)
        dispatch(actDashAddVoc(formData)).unwrap().then(() => {
            language === 'French' ? toast.success('ajouté!') : toast.success('تم اضافة!')

        })
    }


    return (
        <div className='user-view _add-view'>
            <h1>{language === 'French' ? "Informations de base" : "المعلومات الأساسية"}</h1> "


            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "vocabulaire" : "المفردة "}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setWord(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "vocabulaire en arabe" : "المفردة بالعربي"}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setTranslation(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "exemple" : "مثال"}</span>
                            <input
                                type='text'
                                className='form-control'
                                onChange={e => setExample(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'French' ? "fichier audio" : "الملف الصوتي"}</span>
                            <input
                                type='file'
                                className='form-control'
                                onChange={fileHandler}
                            />
                        </p>
                    </div>





                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === "French" ? "Ajouter" : "اضافة"}</button>
        </div>
    )
}

export default Add