import UnitsList from "@components/Unit/UnitsList/UnitsList"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import actShowCourse from "@store/course/act/actShowCourse"
import { actCLearUnit, actGetUnits } from "@store/unit/unitSlice"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './Level.css';
import '../Unit/Unit.css'
import Add from '@components/Admin/Units/Add/Add';
import { Container } from "react-bootstrap"
import { Dialog } from "primereact/dialog"
import { Button } from "@components/index"
import actDashGetUnits from "@store/dashboard/actUnit/actDashGetUnit"
const Level = () => {
    const { idLevel, id } = useParams()
    const [showAddMode, setShowAddMode] = useState(false);
    const { userData } = useAppSelector(state => state.auth)

    const levelIndx = parseInt(idLevel as string)
    const indx = parseInt(id as string)
    const { language } = useAppSelector(state => state.language)
    const { course } = useAppSelector(state => state.course)
    const { units } = useAppSelector(state => state.unit)
    const unitsAdmin = useAppSelector(state => state.dashboard.units)
    const levelInfo = course?.levels?.find((le) => le.id === levelIndx)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actShowCourse(indx))
        dispatch(actGetUnits(levelIndx))
        if (userData?.user.roles?.length)
            dispatch(actDashGetUnits(levelIndx))
        return () => {
            dispatch(actCLearUnit())
        }
    }, [])


    return (
        <div className="levelInfo">
            <Container>
                <div className="unit-page">
                    <div className="unit-container">
                        {/* Unit Information Section */}
                        <div className="unit-header">

                            <div className="left">
                                <h2>
                                    {language === 'French' ? 'Informations de niveau' : "معلومات المستوى"}
                                </h2>
                                <div className="text">
                                    <h3>
                                        - {language === 'French' ? levelInfo?.title : levelInfo?.title_ar}
                                    </h3>

                                    <p>
                                        {language === 'French' ? levelInfo?.description : levelInfo?.description_ar}

                                    </p>
                                </div>

                            </div>

                            <div className="right">
                                <h3>
                                    {language === 'French' ? 'Unités' : "الوحدات"}
                                </h3>

                                {userData?.user.roles?.length ?
                                    <div className="btns-ad">
                                        <Button onClick={() => setShowAddMode(true)}><i className='pi pi-plus'></i> {language === 'French' ? 'ajouter un Unité' : "اضافة وحدة"}</Button>
                                    </div>
                                    : ""}
                                <UnitsList units={userData?.user.roles?.length ? unitsAdmin! : units!} />

                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Dialog header={language === "French" ? "Ajouter " : "اضافة"}
                visible={showAddMode}
                style={{ width: '70vw' }}
                onHide={() => setShowAddMode(false)}>

                <Add setUserAdded={() => {
                    setShowAddMode(false);
                }} />
            </Dialog>
        </div >
    )
}

export default Level
