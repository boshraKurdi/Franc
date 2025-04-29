import './LessonCard.css'
import Lock from '@assets/svgs/lock-svgrepo-com.svg?react'
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { TLesson } from '@customtypes/lessonType'
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog } from 'primereact/dialog'
import actDashDeleteLesson from '@store/dashboard/actLesson/actDashDeleteLesson'
import { confirmDialog } from 'primereact/confirmdialog'
import toast from 'react-hot-toast'
import actDashShowLesson from '@store/dashboard/actLesson/actDashShowLesson'
import Button from '@components/feedback/Button/Button'
import Edit from '@components/Admin/Lessons/Edit/Edit'
import { useState } from 'react'
const UnitCard = (props: TLesson) => {
    const { language } = useAppSelector(state => state.language)
    const navigate = useNavigate()
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setselectedUserId] = useState<null | number>(null);
    const { userData } = useAppSelector(state => state.auth)
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
    const dispatch = useAppDispatch()
    const deleteUser = (userId: number) => {
        dispatch(actDashDeleteLesson(userId)).unwrap().then(() => {
            language === 'French' ? toast.success('Supprimé avec succès! ') : toast.success('تم الحذف بنجاح !')

        })
    }
    const { id, idLevel, idUnit } = useParams()
    return (
        <div key={props.id} className="lesson-card">
            <div className="lesson-content">
                <div className="lesson-header">
                    <div
                        className={`lesson-icon ${props?.is_locked
                            ? "locked"
                            : props?.id === 100
                                ? "completed"
                                : "active"
                            }`}
                    >
                        {props?.is_locked
                            ? "🔒"
                            : props?.id === 100
                                ? "✓"
                                : "📖"}
                    </div>
                    <h3 className="lesson-title">
                        {language === "French" ? props.title : props.title_ar}
                    </h3>
                </div>

                {!props?.is_locked && (
                    <>
                        {/* <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `10%` }}
                          ></div>
                        </div> */}
                        <div className="lesson-footer">
                            {/* <span className="progress-text">
                            {"10"}%{" "}
                            {language === "French" ? "complété" : "مكتمل"}
                          </span> */}
                            <button
                                onClick={() => navigate(userData?.user.roles?.length ? `/dashboard/courses/${id}/levels/${idLevel}/units/${idUnit}/lessons/${props.id}` : `/courses/${id}/levels/${idLevel}/units/${idUnit}/lessons/${props.id}`)}

                                className="start-btn">
                                {language === "French" ? "Commencer" : "ابدأ"}
                            </button>
                        </div>
                    </>
                )}
                {
                    userData?.user.roles?.length ? <div className="btns-op">
                        <Button onClick={() => {
                            dispatch(actDashShowLesson(props.id!))
                            setselectedUserId(props.id!)
                            setShowEditMode(true)
                        }
                        }>{language === 'French' ? 'modifier ' : "تعديل "}</Button>
                        <Button onClick={() => {
                            deleteUserConfirm(props.id!)
                        }
                        }>{language === 'French' ? 'supprimer ' : "حذف "}</Button>
                    </div>
                        : ""
                }
                <Dialog header={language === "French" ? "modifier " : "تعديل "}
                    visible={showEditMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowEditMode(false)}>

                    <Edit userId={selectedUserId!} setUserEdited={() => {
                        setShowEditMode(false);
                    }} />
                </Dialog>
                {props?.is_locked && (
                    <div className="locked-message">
                        {language === "French"
                            ? "Leçon verrouillée"
                            : "الدرس مقفل"}
                    </div>
                )}
            </div>
        </div>
        // <div

        //     className={props?.is_locked ? `lessonCard` : `lessonCard active`}>
        //     <div
        //         onClick={() => navigate(userData?.user.roles?.length ? `/dashboard/courses/${id}/levels/${idLevel}/units/${idUnit}/lessons/${props.id}` : `/courses/${id}/levels/${idLevel}/units/${idUnit}/lessons/${props.id}`)}
        //         className="text">
        //         <h4> {language === "French" ? props.title : props.title_ar}</h4>
        //         <p>{language === "French" ? props.objective : props.objective_ar}</p>
        //     </div>
        //     {props?.is_locked &&
        //         <div className="lock">
        //             <Lock style={{ width: '30px', height: '30px' }} />
        //         </div>
        //     }
        //     {
        //         userData?.user.roles?.length ? <div className="btns-op">
        //             <Button onClick={() => {
        //                 dispatch(actDashShowLesson(props.id!))
        //                 setselectedUserId(props.id!)
        //                 setShowEditMode(true)
        //             }
        //             }>{language === 'French' ? 'modifier ' : "تعديل "}</Button>
        //             <Button onClick={() => {
        //                 deleteUserConfirm(props.id!)
        //             }
        //             }>{language === 'French' ? 'supprimer ' : "حذف "}</Button>
        //         </div>
        //             : ""
        //     }
        //     <Dialog header={language === "French" ? "modifier " : "تعديل "}
        //         visible={showEditMode}
        //         style={{ width: '70vw' }}
        //         onHide={() => setShowEditMode(false)}>

        //         <Edit userId={selectedUserId!} setUserEdited={() => {
        //             setShowEditMode(false);
        //         }} />
        //     </Dialog>
        // </div>
    )
}

export default UnitCard
