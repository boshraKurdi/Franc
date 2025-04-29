import { useAppDispatch, useAppSelector } from "@hooks/app";
import { actGetUnits } from "@store/unit/unitSlice";
import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { useNavigate, useParams } from "react-router-dom";
import "./Unit.css";
import { Container } from "react-bootstrap";
import { actCLearLessons, actGetLessons } from "@store/lesson/lessonSlice";
import { setGameState } from "@store/quiz/quizSlice";
import { Dialog } from "primereact/dialog"
import Add from '@components/Admin/Lessons/Add/Add'
import actDashGetLessons from "@store/dashboard/actLesson/actDashGetLesson";
import LessonsList from "@components/Lesson/LessonsList/LessonsList";
import { Button } from "@components/index";
const Lesson = () => {
  const { idLevel, idUnit } = useParams();
  const [showAddMode, setShowAddMode] = useState(false);
  const { userData } = useAppSelector((state) => state.auth);
  const unitIndx = parseInt(idUnit as string);
  const levelIndx = parseInt(idLevel as string);
  const { language } = useAppSelector((state) => state.language);
  const { units } = useAppSelector((state) => state.unit);
  const { lessons } = useAppSelector((state) => state.lesson);
  const lessonsAdmin = useAppSelector((state) => state.dashboard.lessons);
  const unitInfo = units?.find((unit) => unit.id === unitIndx);
  const cookie = Cookie();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetLessons(unitIndx));
    dispatch(actGetUnits(levelIndx));

    if (userData?.user.roles?.length) {
      dispatch(actDashGetLessons(unitIndx));
    }
    return () => {
      dispatch(actCLearLessons());
    };
  }, []);
  const showTest = () => {
    if (cookie.get("token")) {
      navigate(`quiz`);
    } else {
      navigate(`/login`);
    }
  };
  const goToTest = () => {
    dispatch(setGameState("playing"));
  };
  const lessonsInfo = userData?.user.roles?.length ? lessonsAdmin : lessons;
  return (
    <div className="unitInfo">
      <Container>
        <div className="unit-page">
          <div className="unit-container">
            {/* Unit Information Section */}
            <div className="unit-header">
              <h1>
                {language === "French" ? unitInfo?.title : unitInfo?.title_ar}
              </h1>
              <p>
                {language === "French"
                  ? unitInfo?.description
                  : unitInfo?.description_ar}
              </p>
            </div>

            {/* Admin Controls */}

            {userData?.user.roles?.length ?
              <div className="btns-ad">
                <Button onClick={() => setShowAddMode(true)}><i className='pi pi-plus'></i> {language === 'French' ? 'ajouter un leçon' : "اضافة درس"}</Button>
              </div>
              : ""}

            {/* Lessons Grid */}
            <LessonsList lessons={lessonsInfo!} />
          </div>

          {/* Unit Test Button */}
          <div onClick={showTest} className="test-button-container">
            <button onClick={goToTest} className="unit-test-btn">
              {language === "French" ? "Test de unité" : "اختبار الوحدة"}
            </button>
          </div >
        </div >
        <Dialog header={language === "French" ? "Ajouter " : "اضافة"}
          visible={showAddMode}
          style={{ width: '70vw' }}
          onHide={() => setShowAddMode(false)}>

          <Add setUserAdded={() => {
            setShowAddMode(false);
          }} />
        </Dialog>
      </Container >
    </div>
  )
  {/* <div className="unitInfo">
         <Container>
             <div className="left">
                 <h2>
                     {language === 'French' ? 'Informations de unité' : "معلومات الوحدة"}

                 </h2>
                <div className="text">
                    <h3>
                         - {language === 'French' ? unitInfo?.title : unitInfo?.title_ar}
                     </h3>

                     <p>
                         {language === 'French' ? unitInfo?.description : unitInfo?.description_ar}
                 </p>
                 </div>

             </div>

             <div className="right">
                 <h3>
                     {language === 'French' ? 'leçons' : "الدروس"}
                 </h3>
                 {userData?.user.roles?.length ?
                     <div className="btns-ad">
                         <Button onClick={() => setShowAddMode(true)}><i className='pi pi-plus'></i> {language === 'French' ? 'ajouter un leçon' : "اضافة درس"}</Button>
                     </div>
                     : ""}
                 <LessonsList lessons={userData?.user.roles?.length ? lessonsAdmin! : lessons!} />
             </div>
             <div onClick={showTest} className="btns">
                 <Button onClick={goToTest} >{
                     language === "French" ? "Test de unité"
                         : "اختبار الوحدة"}</Button>
             </div>
         </Container>
       
     </div>  */}

};

export default Lesson;
