import { Container, Table } from 'react-bootstrap'
import './Lesson.css'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { Fragment, useEffect, useState } from 'react'
import { actGetLessons } from '@store/lesson/lessonSlice'
import { useNavigate, useParams } from 'react-router-dom'
import HeadingTitle from '@components/common/HeadingTitle/HeadingTitle'
import { Button } from '@components/index'
import Add from '@components/Admin/Vocabularies/Add/Add'
import Edit from '@components/Admin/Vocabularies/Edit/Edit'

import Cookie from 'cookie-universal'
import { setGameState } from '@store/quiz/quizSlice'
import { Dialog } from 'primereact/dialog'
import actDashShowVoc from '@store/dashboard/actVocabulary/actDashShowVoc'
import toast from 'react-hot-toast'
import actDashDeleteVoc from '@store/dashboard/actVocabulary/actDashDeleteVoc'
import { confirmDialog } from 'primereact/confirmdialog'
import ReactAudioPlayer from 'react-audio-player'
import actDashGetVoc from '@store/dashboard/actVocabulary/actDashGetVoc'
const Lesson = () => {

    const { lessons } = useAppSelector(state => state.lesson)
    const { language } = useAppSelector(state => state.language)
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setselectedUserId] = useState<null | number>(null);
    const { userData } = useAppSelector(state => state.auth)
    const { vocabularies } = useAppSelector(state => state.dashboard)
    const { idUnit, idLesson } = useParams()
    const unitIndx = parseInt(idUnit as string)
    const lessonIndx = parseInt(idLesson as string)
    const dispatch = useAppDispatch()
    const lessonInfo = lessons?.find(le => le.id === lessonIndx)
    useEffect(() => {
        dispatch(actGetLessons(unitIndx))
        if (userData?.user.roles?.length) {
            dispatch(actDashGetVoc(lessonIndx))
        }
    }, [])
    const deleteUserConfirm = (userId: number) => {
        confirmDialog({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف الكورس' : 'Êtes-vous sûr de vouloir supprimer ce cours ?',
            header: language === 'French' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'French' ? 'oui' : "نعم",
            rejectLabel: language === 'French' ? 'Non' : " لا",
            accept: () => {
                deleteUser(userId)
            },
        });
    }
    const showHandler = (e: any) => {
        (e.target as Element)?.classList.add("active");
    }
    const deleteUser = (userId: number) => {
        dispatch(actDashDeleteVoc(userId)).unwrap().then(() => {
            language === 'French' ? toast.success('Supprimé avec succès! ') : toast.success('تم الحذف بنجاح !')

        })
    }
    const datavoc = userData?.user.roles?.length ? vocabularies : lessonInfo?.vocabulary;
    const vocalList = datavoc?.map(vo => <Fragment key={vo.id}>
        <tr >
            <td >
                <h5>{vo.word}</h5>
            </td>
            <td >
                <h5>{vo.translation}</h5>
            </td>
            <td>
                <div className='btns' onClick={showHandler} >
                    <Button className={"audioBtn"}>{language === 'French' ? "écoute " : "استمع "}</Button>
                    <ReactAudioPlayer className={"audio"} controls src={vo.media[0]?.original_url} />
                </div>



            </td>
        </tr>
        <tr>
            <td colSpan={3}>
                <h5>{vo.example_sentence}</h5>
            </td>
        </tr>

        {
            userData?.user.roles?.length ? <tr >
                <td colSpan={3}>
                    <div className="btns-op">
                        <Button onClick={() => {
                            dispatch(actDashShowVoc(vo.id!))
                            setselectedUserId(vo.id!)
                            setShowEditMode(true)
                        }
                        }>{language === 'French' ? 'modifier ' : "تعديل "}</Button>
                        <Button onClick={() => {
                            deleteUserConfirm(vo.id!)
                        }
                        }>{language === 'French' ? 'supprimer ' : "حذف "}</Button>
                    </div>
                </td>

            </tr>

                : ""
        }
    </Fragment>

    )
    const cookie = Cookie()
    const navigate = useNavigate()
    const showTest = () => {
        if (cookie.get('token')) {
            navigate(`quiz`)
        } else {
            navigate(`/login`)

        }
    }
    const goToTest = () => {
        dispatch(setGameState("playing"))
    }
    return (
        <div className='showLesson'>
            <Container>
                <HeadingTitle>{language === 'French' ? lessonInfo?.title : lessonInfo?.title_ar}</HeadingTitle>
                <h4>{language === 'French' ? lessonInfo?.objective : lessonInfo?.objective_ar}</h4>
                <p>{language === 'French' ? lessonInfo?.content : lessonInfo?.content_ar}</p>
                <a href={lessonInfo?.video_url!}>{language === 'French' ? "regarder le leçon" : "شاهد الدرس"}</a>
                <hr />
                <h3>{language === 'French' ? "Vocabulaires" : "المفردات"}</h3>
                {userData?.user.roles?.length ?
                    <div className="btns-ad">
                        <Button onClick={() => setShowAddMode(true)}><i className='pi pi-plus'></i> {language === 'French' ? 'ajouter un Vocabulaires' : "اضافة مفردة"}</Button>
                    </div>
                    : ""}
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                {language === 'French' ? "en français" : "في الفرنسية"}
                            </th>
                            <th>
                                {language === 'French' ? "en arabe" : "في العربية"}

                            </th>
                            <th>
                                {language === 'French' ? "écoute le mot" : "استمع للكلمة"}

                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {vocalList}
                    </tbody>
                </Table>

                <div onClick={showTest} className="btns">
                    <Button onClick={goToTest} >{
                        language === "French" ? "Test de leçon"
                            : "اختبار الدرس"}</Button>
                </div>
            </Container >
            <Dialog header={language === "French" ? "Ajouter " : "اضافة"}
                visible={showAddMode}
                style={{ width: '70vw' }}
                onHide={() => setShowAddMode(false)}>

                <Add setUserAdded={() => {
                    setShowAddMode(false);
                    // getAllUsers();
                }} />
            </Dialog>

            <Dialog header={language === "French" ? "modifier " : "تعديل "}
                visible={showEditMode}
                style={{ width: '70vw' }}
                onHide={() => setShowEditMode(false)}>

                <Edit userId={selectedUserId!} setUserEdited={() => {
                    setShowEditMode(false);
                }} />
            </Dialog>
        </div>
    )
}

export default Lesson
