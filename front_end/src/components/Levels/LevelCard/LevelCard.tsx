import { TLevel } from "@customtypes/levelType"
import './LevelsCard.css'
import Lock from '@assets/svgs/lock-svgrepo-com.svg?react'
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import actDashDeleteLevel from "@store/dashboard/actLevel/actDashDeleteLevel"
import { confirmDialog } from "primereact/confirmdialog"
import Button from "@components/feedback/Button/Button"
import { Dialog } from "primereact/dialog"
import EditUser from "@components/Admin/Levels/Edit/Edit"
import { useState } from "react"
import toast from "react-hot-toast"
import actDashShowLevel from "@store/dashboard/actLevel/actDashShowLevel"
const LevelCard = (props: TLevel) => {
    const { language } = useAppSelector(state => state.language)
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
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const deleteUser = (userId: number) => {
        dispatch(actDashDeleteLevel(userId)).unwrap().then(() => {
            language === 'French' ? toast.success('Supprimé avec succès! ') : toast.success('تم الحذف بنجاح !')

        })
    }
    const indx = parseInt(id as string)
    return (
        <div style={userData?.user.roles?.length ? {
            padding: "3px"
        } : {}}
            className={props?.is_locked ? `levelCard` : `levelCard active`}>
            <div className="text">
                <h4 onClick={() =>
                    navigate(userData?.user.roles?.length ? `/dashboard/courses/${indx}/levels/${props.id}` : `/courses/${indx}/levels/${props.id}`)}>{props.num! + 1}. {language === "French" ? props.title : props.title_ar}</h4>
                <p>{language === "French" ? props.description : props.description_ar}</p>
                {
                    userData?.user.roles?.length ? <div className="btns-op">
                        <Button onClick={() => {
                            dispatch(actDashShowLevel(props.id!))
                            setselectedUserId(props.id!)
                            setShowEditMode(true)
                        }
                        }>{language === 'French' ? 'modifier ' : "تعديل"}</Button>
                        <Button onClick={() => {
                            deleteUserConfirm(props.id!)
                        }
                        }>{language === 'French' ? 'supprimer ' : "حذف "}</Button>
                    </div>
                        : ""
                }
            </div>
            {props?.is_locked &&
                <div className="lock">
                    <Lock style={{ width: '30px', height: '30px' }} />
                </div>
            }


            <Dialog header={language === "French" ? "modifier " : "تعديل "}
                visible={showEditMode}
                style={{ width: '70vw' }}
                onHide={() => setShowEditMode(false)}>

                <EditUser userId={selectedUserId!} setUserEdited={() => {
                    setShowEditMode(false);
                }} />
            </Dialog>
        </div>
    )
}

export default LevelCard
