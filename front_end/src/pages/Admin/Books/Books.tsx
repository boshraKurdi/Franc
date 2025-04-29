import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import ViewUser from '@components/Admin/Books/View';
import AddUser from '@components/Admin/Books/Add/Add';
import EditUser from '@components/Admin/Books/Edit/Edit';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './Books.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container } from 'react-bootstrap';
import actDashDeleteBook from '@store/dashboard/actBook/actDashDeleteBook';
import actDashGetBook from '@store/dashboard/actBook/actDashGetBook';
type TCourse = {
    id: number,
    title: string | null,
    description: string | null,
    price: number | null,
    author: string | null,
    metaphor: number | null,
    image: React.ReactNode
}
type TCourseAra = {
    id: number,
    العنوان: string | null,
    الوصف: string | null,
    السعر: number | null,
    الكاتب: string | null,
    سعر_الاستعارة: number | null,
    الصورة: React.ReactNode,
}
function Operations() {
    const { language } = useAppSelector(state => state.language);
    const { books } = useAppSelector(state => state.dashboard);
    const [users, setUsersList] = useState<TCourse[] | TCourseAra[]>([]);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [showViewMode, setShowViewMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(actDashGetBook())

    }, [dispatch])
    useEffect(() => {
        if (books) {
            const course: TCourse[] = books?.map((course) => {
                return ({
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    price: course.price,
                    author: course.author,
                    metaphor: course.metaphor,
                    image: <img src={`${course?.media[0]?.original_url}`} style={{ marginTop: '10px', width: '50px', height: '50px' }} />,

                })
            })!
            const courseAra: TCourseAra[] = books?.map((course) => {
                return ({
                    id: course.id,
                    العنوان: course.title_ar,
                    الوصف: course.description_ar,
                    السعر: course.price,
                    سعر_الاستعارة: course.metaphor,
                    الكاتب: course.author,
                    الصورة: <img src={`${course?.media[0]?.original_url}`} style={{ marginTop: '10px', width: '50px', height: '50px' }} />,


                })
            })!
            const data = language === 'Arabic' ? courseAra : course
            setUsersList(data);
        }

    }, [language, books])


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
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف  الكتب ؟' : 'Êtes-vous sûr de vouloir supprimer ce livre ?',
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
        dispatch(actDashDeleteBook(userId)).unwrap().then(() => {
            language === 'French' ? toast.success('Supprimé avec succès! ') : toast.success('تم الحذف بنجاح !')

            // navigate(`/dashboard/main`)
        })
    }

    return (
        <div className='op'>
            <Container>
                <div className='users-page'>
                    <h1>
                        {language === 'French' ? 'Les livres dans le système' : 'الكتب في النظام'}
                    </h1>
                    <h3>
                        {language === 'French' ? 'Opérations sur les livres' : ' التعديلات على الكتب '}
                    </h3>

                    <div className='users-list'>
                        <div className='addNewUser'>
                            <button className='btn btn-success' onClick={() => setShowAddMode(true)}>
                                <i className='pi pi-plus'></i>   {language === 'French' ? " Ajouter un nouveau livre " : " اضافة كتاب جديد"}
                            </button>
                        </div>
                        <DataTable className='tableCell' value={users}>
                            <Column field={language === 'French' ? 'title' : 'العنوان'}
                                header={language === 'French' ? 'titre' : 'العنوان'}></Column>
                            <Column field={language === 'French' ? 'description' : 'الوصف'} header={language === 'French' ? 'description' : 'الوصف'}></Column>
                            <Column field={language === 'French' ? 'price' : 'السعر'} header={language === 'French' ? 'description' : 'الوصف'}></Column>
                            <Column field={language === 'French' ? 'metaphor' : 'سعر_الاستعارة'} header={language === 'French' ? 'emprunter' : 'سعر_الاستعارة'}></Column>
                            <Column field={language === 'French' ? 'image' : 'الصورة'} header={language === 'French' ? 'image' : 'الصورة'}></Column>
                            <Column field={language === 'French' ? 'author' : 'الكاتب'} header={language === 'French' ? 'auteur' : 'الكاتب'}></Column>

                            <Column header={language === 'Arabic' ? 'العمليات' : 'actes'} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>

                <Dialog header={language === "French" ? "afficher les données du livre" : "تصفح معلومات الكتاب"}
                    visible={showViewMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowViewMode(false)}>

                    <ViewUser userId={selectedUserId!} />
                </Dialog>

                <Dialog header={language === "French" ? "Ajouter un nouveau livre" : "اضافة كتاب جديد"}
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