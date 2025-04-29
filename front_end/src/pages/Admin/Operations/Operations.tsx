import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
// import ViewUser from './View/View';
import AddUser from '@components/Admin/Courses/Add/Add';
import EditUser from '@components/Admin/Courses/Edit/Edit';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './Operations.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { actDashGetCourses } from '@store/dashboard/dashboard';
import actDashDeleteCourses from '@store/dashboard/actCourse/actDashDeleteCourse';
import { Container } from 'react-bootstrap';
type TCourse = {
    id: number,
    title: string | null,
    description: string | null,
    image: React.ReactNode
}
type TCourseAra = {
    id: number,
    العنوان: string | null,
    الوصف: string | null
    الصورة: React.ReactNode,
}
function Operations() {
    const { language } = useAppSelector(state => state.language);
    const { courses } = useAppSelector(state => state.dashboard);
    const [users, setUsersList] = useState<TCourse[] | TCourseAra[]>([]);
    // const [showViewMode, setShowViewMode] = useState(false);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actDashGetCourses())

    }, [dispatch])
    useEffect(() => {
        if (courses) {
            const course: TCourse[] = courses?.map((course) => {
                return ({
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    image: <img src={`${course?.media[0]?.original_url}`} style={{ marginTop: '10px', width: '50px', height: '50px' }} />,

                })
            })!
            const courseAra: TCourseAra[] = courses?.map((course) => {
                return ({
                    id: course.id,
                    العنوان: course.title,
                    الوصف: course.description,
                    الصورة: <img src={`${course?.media[0]?.original_url}`} style={{ marginTop: '10px', width: '50px', height: '50px' }} />,


                })
            })!
            const data = language === 'Arabic' ? courseAra : course
            setUsersList(data);
        }

    }, [language, courses])


    const actionsTemplate = (rowDate: TCourse) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    navigate(`/dashboard/courses/${rowDate.id}/show`)

                    // setSelectedUserId(rowDate?.id)
                    // setShowViewMode(true)

                }}>
                    <i className='pi pi-eye'></i>
                </button>
                <button className='btn btn-primary' onClick={() => {
                    setSelectedUserId(rowDate?.id)
                    setShowEditMode(true)
                }}>
                    <i className='pi pi-file-edit'></i>
                </button>
                <button className='btn btn-danger' onClick={() => {

                    deleteUserConfirm(rowDate?.id)
                }

                }>
                    <i className='pi pi-trash'></i>
                </button>
            </>
        )
    }

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

    const deleteUser = (userId: number) => {
        dispatch(actDashDeleteCourses(userId)).unwrap().then(() => {
            language === 'French' ? toast.success('Supprimé avec succès! ') : toast.success('تم الحذف بنجاح !')

            // navigate(`/dashboard/main`)
        })
    }

    return (
        <div className='op'>
            <Container>
                <div className='users-page'>
                    {/* <div className='container'> */}
                    <h1>
                        {language === 'French' ? 'Le cours dans le système' : 'الكورسات في النظام'}
                    </h1>
                    <h3>
                        {language === 'French' ? 'Opérations sur les livres' : ' التعديلات على الكورسات '}
                    </h3>

                    <div className='users-list'>
                        <div className='addNewUser'>
                            <button className='btn btn-success' onClick={() => setShowAddMode(true)}>
                                <i className='pi pi-plus'></i>   {language === 'French' ? " Ajouter un nouveau cours " : " اضافة كورس جديد"}
                            </button>
                        </div>
                        <DataTable className='tableCell' value={users}>
                            <Column field={language === 'French' ? 'title' : 'العنوان'}
                                header={language === 'French' ? 'titre' : 'العنوان'}></Column>
                            <Column field={language === 'French' ? 'description' : 'الوصف'} header={language === 'French' ? 'description' : 'الوصف'}></Column>
                            <Column field={language === 'French' ? 'image' : 'الصورة'} header={language === 'French' ? 'image' : 'الصورة'}></Column>

                            <Column header={language === 'Arabic' ? 'العمليات' : 'actes'} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>

                {/* <Dialog header={language === "French" ? "afficher les données du cours" : "تصفح معلومات الكورس"}
                    visible={showViewMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowViewMode(false)}>

                    <ViewUser userId={selectedUserId} />
                </Dialog> */}

                <Dialog header={language === "French" ? "Ajouter un nouveau cours" : "اضافة كورس جديد"}
                    visible={showAddMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowAddMode(false)}>

                    <AddUser setUserAdded={() => {
                        setShowAddMode(false);
                    }} />
                </Dialog>

                <Dialog header="modifier"
                    visible={showEditMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowEditMode(false)}>

                    <EditUser userId={selectedUserId!} setUserEdited={() => {
                        setShowEditMode(false);
                    }} />
                </Dialog>


            </Container>
        </div>
    )
}

export default Operations