import LevelsList from "@components/Levels/LevelsList/LevelsList";
import TopicsList from "@components/Topics/TopicsList/TopicsList";
import { useAppDispatch, useAppSelector } from "@hooks/app";
import actShowCourse from "@store/course/act/actShowCourse";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import './CourseInfo.css'
import { Container } from "react-bootstrap";
import Cookie from 'cookie-universal'
import HeadingTitle from "@components/common/HeadingTitle/HeadingTitle";
import { Button } from "@components/index";
import { setGameState } from "@store/quiz/quizSlice";
import { Dialog } from "primereact/dialog";
import AddTopic from '@components/Admin/Topics/Add/Add';
import AddLevel from '@components/Admin/Levels/Add/Add';

import actDashGetTopics from "@store/dashboard/actTopic/actDashGetTopic";
import actDashGetLevels from "@store/dashboard/actLevel/actDashGetLevel";

const CourseInfo = () => {
    const cookie = Cookie();
    const [showAddMode, setShowAddMode] = useState(false);
    const [showAddLevelMode, setShowAddLevelMode] = useState(false);
    const { id } = useParams();
    const { course } = useAppSelector(state => state.course)
    const { language } = useAppSelector(state => state.language)
    const { userData } = useAppSelector(state => state.auth)
    const { topics, levels } = useAppSelector(state => state.dashboard)
    const indx = parseInt(id as string)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actShowCourse(indx))
        if (userData?.user.roles?.length) {
            dispatch(actDashGetTopics(indx))
            dispatch(actDashGetLevels(indx))
        }
    }, [])
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
        <div className="showCourse">
            <Container className="cont">
                <div className="left">
                    <div className="image">
                        <img src={course?.media[0]?.original_url!} alt="" />
                    </div>
                    <div className="bottom">
                        <HeadingTitle>{language === "French" ? "Niveaux" : "المستويات"}</HeadingTitle>
                        {userData?.user.roles?.length ?
                            <div className="btns-ad">
                                <Button onClick={() => setShowAddLevelMode(true)}><i className='pi pi-plus'></i> {language === 'French' ? 'ajouter un Niveau' : "اضافة مستوى"}</Button>
                            </div>
                            : ""}
                        <LevelsList levels={userData?.user.roles?.length ? levels! : course?.levels!} />
                    </div>
                </div>
                <div className="right">
                    <h2>{language === 'French' ? "Sujets:" : "المحاور:"}</h2>
                    {userData?.user.roles?.length ?
                        <div className="btns-ad">
                            <Button onClick={() => setShowAddMode(true)}><i className='pi pi-plus'></i> {language === 'French' ? 'ajouter un sujet' : "اضافة محور"}</Button>
                        </div>
                        : ""}
                    <TopicsList topics={userData?.user.roles?.length ? topics! : course?.topics!} />
                    {/* {!cookie.get('token') ?
                        <div className="btn">
                            <Button>{language === "French" ? "Test de niveau" : "اختبار تحديد المستوى"}</Button>
                        </div> : ""} */}
                    <div onClick={showTest} className="btns">
                        <Button style={course?.buttonLevelQuiz ? {

                        } : {
                            backgroundColor: '#acc7dd'
                        }} onClick={goToTest} disabled={!course?.buttonLevelQuiz}>{!course?.buttonLevelQuiz && language === 'French' ? 'tu as déjà passé ce test' : !course?.buttonLevelQuiz && language === 'Arabic' ? 'لقد خضت هذا الاختبار من قبل' : language === "French" ? "Test de niveau"
                            : "اختبار تحديد المستوى"}</Button>
                    </div>
                </div>
                <Dialog header={language === "French" ? "Ajouter un nouveau sujet" : "اضافة محور جديد"}
                    visible={showAddMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowAddMode(false)}>

                    <AddTopic setUserAdded={() => {
                        setShowAddMode(false);
                        // getAllUsers();
                    }} />
                </Dialog>
                <Dialog header={language === "French" ? "Ajouter un nouveau niveau" : "اضافة محور جديد"}
                    visible={showAddLevelMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowAddLevelMode(false)}>

                    <AddLevel setUserAdded={() => {
                        setShowAddLevelMode(false);
                        // getAllUsers();
                    }} />
                </Dialog>
            </Container>

        </div>
    )
}

export default CourseInfo
