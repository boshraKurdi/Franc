import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import ViewUser from '@components/Admin/Books/View';
import AddUser from '@components/Admin/Books/Add/Add';
import EditUser from '@components/Admin/Books/Edit/Edit';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './Payments.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container } from 'react-bootstrap';
import actDashDeleteBook from '@store/dashboard/actBook/actDashDeleteBook';
import { actGetPayments } from '@store/payment/paymentSlice';
import actUpdatePayment from '@store/payment/act/actUpdatePayment';
type TCourse = {
    id: number,
    title: string | null,
    description: string | null,
    price: number | null,
    author: string | null,
    metaphor: number | null,
    cvc: number,
    status: string,
    email: string,
    createdAt: string
    type: string,
    name: string
}
type TCourseAra = {
    id: number,
    العنوان: string | null,
    الوصف: string | null,
    السعر: number | null,
    الكاتب: string | null,
    سعر_الاستعارة: number | null,
    cvc: number,
    الحالة: string,
    الايميل: string,
    النوع: string,
    الاسم: string
    تاريخ_الطلب: string
}
function Payments() {
    const { language } = useAppSelector(state => state.language);
    const { payments } = useAppSelector(state => state.payment);
    const [users, setUsersList] = useState<TCourse[] | TCourseAra[]>([]);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [showViewMode, setShowViewMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(actGetPayments())

    }, [dispatch])
    useEffect(() => {
        if (payments) {
            const course: TCourse[] = payments?.map((course) => {
                return ({
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    price: course.price,
                    author: course.author,
                    metaphor: course.metaphor,
                    cvc: course.cvc,
                    status: course.status,
                    email: course.email,
                    type: course.type,
                    name: course.name,
                    createdAt: course.created_at


                })
            })!
            const courseAra: TCourseAra[] = payments?.map((course) => {
                return ({
                    id: course.id,
                    العنوان: course.title_ar,
                    الوصف: course.description_ar,
                    السعر: course.price,
                    سعر_الاستعارة: course.metaphor,
                    الكاتب: course.author,
                    cvc: course.cvc,
                    الحالة: course.status,
                    الايميل: course.email,
                    النوع: course.type,
                    الاسم: course.name,
                    تاريخ_الطلب: course.created_at


                })
            })!
            const data = language === 'Arabic' ? courseAra : course
            setUsersList(data);
        }

    }, [language, payments])


    const actionsTemplate = (rowDate: TCourse) => {
        return (
            <>
                {rowDate.status === 'order' ?
                    <button className='btn btn-primary' onClick={() => {
                        console.log(rowDate)
                        updateConfirm(rowDate.id)
                    }}>
                        <i className='pi pi-shopping-bag'></i>

                    </button>
                    : ""}
                {/* <button className='btn btn-primary' onClick={() => {
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
                </button> */}
            </>
        )
    }

    const updateConfirm = (id: number) => {
        confirmDialog({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد تحويله للشحن؟' : 'Êtes-vous sûr de vouloir supprimer ce livre ?',
            header: language === 'French' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-shopping-bag',
            acceptLabel: language === 'French' ? 'oui' : "نعم",
            rejectLabel: language === 'French' ? 'Non' : " لا",
            accept: () => {
                updateState(id)
            },
        });
    }

    const updateState = (id: number) => {
        dispatch(actUpdatePayment(id)).unwrap().then(() => {
            language === 'French' ? toast.success(' succès! ') : toast.success('تم بنجاح !')

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

                        <DataTable className='tableCell' value={users}>
                            <Column field={language === 'French' ? 'title' : 'العنوان'}
                                header={language === 'French' ? 'titre' : 'العنوان'}></Column>
                            <Column field={language === 'French' ? 'description' : 'الوصف'} header={language === 'French' ? 'description' : 'الوصف'}></Column>
                            <Column field={language === 'French' ? 'price' : 'السعر'} header={language === 'French' ? 'description' : 'الوصف'}></Column>
                            <Column field={language === 'French' ? 'metaphor' : 'سعر_الاستعارة'} header={language === 'French' ? 'emprunter' : 'سعر الاستعارة'}></Column>
                            <Column field={language === 'French' ? 'author' : 'الكاتب'} header={language === 'French' ? 'auteur' : 'الكاتب'}></Column>
                            <Column field={language === 'French' ? 'cvc' : 'cvc'} header={language === 'French' ? 'cvc' : 'cvc'}></Column>
                            <Column field={language === 'French' ? 'name' : 'الاسم'} header={language === 'French' ? 'nom' : ' الاسم'}></Column>
                            <Column field={language === 'French' ? 'email' : 'الايميل'} header={language === 'French' ? 'e-mail' : 'الايميل'}></Column>
                            <Column field={language === 'French' ? 'createdAt' : 'تاريخ_الطلب'} header={language === 'French' ? 'date de commande' : 'تاريخ الطلب'}></Column>
                            <Column field={language === 'French' ? 'type' : 'النوع'} header={language === 'French' ? 'taper' : 'النوع'}></Column>
                            <Column field={language === 'French' ? 'status' : 'الحالة'} header={language === 'French' ? 'statut' : 'الحالة'}></Column>

                            <Column header={language === 'Arabic' ? 'العمليات' : 'actes'} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>

                {/* <Dialog header={language === "French" ? "afficher les données du livre" : "تصفح معلومات الكتاب"}
                    visible={showViewMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowViewMode(false)}>

                    <ViewUser userId={selectedUserId!} />
                </Dialog>

                <Dialog header={language === "French" ? "Ajouter" : "اضافة"}
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
                </Dialog> */}


            </Container>
        </div>
    )
}

export default Payments