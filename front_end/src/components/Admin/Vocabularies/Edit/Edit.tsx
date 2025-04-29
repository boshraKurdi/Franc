import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import toast from 'react-hot-toast';

import { useParams } from 'react-router-dom';
import actDashAddVoc from '@store/dashboard/actVocabulary/actDashAddVoc';
import actDashShowVoc from '@store/dashboard/actVocabulary/actDashShowVoc';


function Add(props: { userId: number, setUserEdited: () => void }) {
    const { vocabulary } = useAppSelector(state => state.dashboard)
    const [word, setWord] = useState(vocabulary?.word);
    const [translation, setTranslation] = useState(vocabulary?.translation);
    const [media, setMedia] = useState("");
    const [example_sentence, setExample] = useState(vocabulary?.example_sentence);
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)
    const fileHandler = (e: any) => {
        // setAudioFile(URL.createObjectURL(e.target.files[0]));
        setMedia(e.target.files[0]);
    }
    const { idLesson } = useParams()
    const addNewUser = () => {
        const formData = new FormData()
        formData.append('id', props?.userId!)
        formData.append('lesson_id', idLesson!)
        formData.append('word', word as string)
        formData.append('translation', translation as string)
        formData.append('media', media as string)
        formData.append('example_sentence', example_sentence as string)
        dispatch(actDashAddVoc(formData)).unwrap().then(() => {
            language === 'French' ? toast.success('édité!') : toast.success('تم التعديل!')

        })
    }
    useEffect(() => {
        dispatch(actDashShowVoc(props.userId))
    }, [dispatch])
    useEffect(() => {
        setWord(vocabulary?.word)
        // setMedia(vocabulary?.media[0]?.original_url!)
        setExample(vocabulary?.example_sentence)
        setTranslation(vocabulary?.translation)
    }, [language, vocabulary])

    return (
        <div className='user-view _add-view'>
            <h1>{language === 'French' ? "Informations de base" : "المعلومات الأساسية"}</h1> "
            <div className='col-sm-12 col-md-6'>
                <p >
                    <span>{language === 'French' ? "Image" : "الصورة"}</span>

                    <div style={{ position: "relative" }}>
                        <input
                            value={media}
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
                        <p>
                            <span>{language === 'French' ? "vocabulaire" : "المفردة "}</span>
                            <input
                                value={word}

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
                                value={translation}

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
                                value={example_sentence}

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
                                value={media}

                                type='text'
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