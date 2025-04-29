import { TLevel } from "@customtypes/levelType"
import './TopicsCard.css'
import EditUser from '@components/Admin/Topics/Edit/Edit';

import { useAppDispatch, useAppSelector } from "@hooks/app"
import Button from "@components/feedback/Button/Button"
import { useState } from "react"
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
import actDashDeleteTopic from "@store/dashboard/actTopic/actDashDeleteTopic";
import toast from "react-hot-toast";
const TopicsCard = (props: TLevel) => {
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
    const dispatch = useAppDispatch()
    const deleteUser = (userId: number) => {
        dispatch(actDashDeleteTopic(userId)).unwrap().then(() => {
            language === 'French' ? toast.success('Supprimé avec succès! ') : toast.success('تم الحذف بنجاح !')

        })
    }
    return (
        <div className="topicsCard">
            <div className="info">
                <h4>{language === "French" ? props.title : props.title_ar}</h4>
                <p>{language === "French" ? props.description : props.description_ar}</p>
            </div>
            {
                userData?.user.roles?.length ? <div className="btns-op">
                    <Button onClick={() => {
                        setShowEditMode(true)
                        setselectedUserId(props?.id!)
                    }
                    }>{language === 'French' ? 'modifier ' : "تعديل"}</Button>
                    <Button onClick={() => {
                        deleteUserConfirm(props?.id!)
                    }
                    }>{language === 'French' ? 'supprimer' : "حذف"}</Button>
                </div>
                    : ""
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

export default TopicsCard
