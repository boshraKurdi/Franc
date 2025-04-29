import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';

import ViewUser from '@components/Admin/QuizLevelOperations/View/View';
import AddUser from '@components/Admin/QuizLevelOperations/Add/Add';
import EditUser from '@components/Admin/QuizLevelOperations/Edit/Edit';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './QuizLevel.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container } from 'react-bootstrap';
import actDashGetQuizCourse from '@store/dashboard/actquizCourse/actDashGetQuizCourse';
import actDashShowQuizCourse from '@store/dashboard/actquizCourse/actDashShowQuizCourse';
import actDashDeleteQuizCourse from '@store/dashboard/actquizCourse/actDashDeleteQuizCourse';
type TQuizTest = {
    id: number,
    question: string,
    answer_1: string,
    answer_2: string,
    answer_3: string,
    answer_4: string,
    answer_right: string,
}

type TQuizTestAra = {
    id: number,
    السؤال: string,
    الاجابة_1: string,
    الاجابة_2: string,
    الاجابة_3: string,
    الاجابة_4: string,
    الاجابة_الصحيحة: string,
}
function QuizLevel({ Id }: { Id: number }) {
    const { language } = useAppSelector(state => state.language);
    const { quiz_courses } = useAppSelector(state => state.dashboard);
    const [users, setUsersList] = useState<TQuizTest[] | TQuizTestAra[]>([]);
    const [showViewMode, setShowViewMode] = useState(false);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(actDashGetQuizCourse(Id!))

    }, [dispatch])
    useEffect(() => {
        if (quiz_courses?.length) {
            const quiz: TQuizTest[] = quiz_courses?.map((course) => {
                return ({
                    id: course.id!,
                    question: course.question,
                    answer_1: course.answer_1,
                    answer_2: course.answer_2,
                    answer_3: course.answer_3,
                    answer_4: course.answer_4,
                    answer_right: course.answer_right,

                })
            })!
            const quizAra: TQuizTestAra[] = quiz_courses?.map((course) => {
                return ({
                    id: course.id!,
                    السؤال: course.question,
                    الاجابة_1: course.answer_1,
                    الاجابة_2: course.answer_2,
                    الاجابة_3: course.answer_3,
                    الاجابة_4: course.answer_4,
                    الاجابة_الصحيحة: course.answer_right,
                })
            })!
            const data = language === 'Arabic' ? quizAra : quiz
            setUsersList(data);


        }

    }, [language, quiz_courses])

    const actionsTemplate = (rowDate: TQuizTest) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {

                    setSelectedUserId(rowDate?.id)
                    dispatch(actDashShowQuizCourse(rowDate.id))
                    setShowViewMode(true)

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
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف السؤال؟' : 'Êtes-vous sûr de vouloir supprimer ce question ?',
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
        dispatch(actDashDeleteQuizCourse(userId)).unwrap().then(() => {
            language === 'French' ? toast.success('Supprimé avec succès! ') : toast.success('تم الحذف بنجاح !')

        })
    }




    return (
        <div className='op'>
            <Container>
                <div className='users-page'>
                    {/* <div className='container'> */}
                    <h1>
                        {language === 'French' ? 'questions de quiz dans le système' : 'الاختبارات في النظام'}
                    </h1>
                    <h3>
                        {language === 'French' ? 'Opérations sur les questions' : ' العمليات على الاختبارات '}
                    </h3>

                    <div className='users-list'>
                        <div className='addNewUser'>
                            <button className='btn btn-success' onClick={() => setShowAddMode(true)}>
                                <i className='pi pi-plus'></i>   {language === 'French' ? " Ajouter un nouveau question " : " اضافة سؤال جديد"}
                            </button>
                        </div>
                        <DataTable className='tableCell' value={users}>
                            <Column field={language === 'French' ? 'question' : 'السؤال'}
                                header={language === 'French' ? 'question' : 'السؤال'}></Column>
                            <Column field={language === 'French' ? 'answer_1' : 'الاجابة_1'} header={language === 'French' ? 'répondre_1' : 'الاجابة_1'}></Column>
                            <Column field={language === 'French' ? 'answer_2' : 'الاجابة_2'} header={language === 'French' ? 'répondre_2' : 'الاجابة_2'}></Column>
                            <Column field={language === 'French' ? 'answer_3' : 'الاجابة_3'} header={language === 'French' ? 'répondre_3' : 'الاجابة_3'}></Column>
                            <Column field={language === 'French' ? 'answer_4' : 'الاجابة_4'} header={language === 'French' ? 'répondre_4' : 'الاجابة_4'}></Column>
                            <Column field={language === 'French' ? 'answer_right' : 'الاجابة_الصحيحة'} header={language === 'French' ? 'bonne réponse' : 'الاجابة_الصحيحة'}></Column>

                            <Column header={language === 'Arabic' ? 'العمليات' : 'actes'} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>

                <Dialog header={language === "French" ? "afficher les données du cours" : "تصفح معلومات الكورس"}
                    visible={showViewMode}
                    style={{ width: '70vw' }}
                    onHide={() => {
                        setShowViewMode(false)
                        dispatch(actDashShowQuizCourse(selectedUserId!))
                    }}>

                    <ViewUser userId={selectedUserId} />
                </Dialog>

                <Dialog header={language === "French" ? "Ajouter un nouveau cours" : "اضافة كورس جديد"}
                    visible={showAddMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowAddMode(false)}>

                    <AddUser id={Id} setUserAdded={() => {
                        setShowAddMode(false);
                    }} />
                </Dialog>

                <Dialog header="modifier"
                    visible={showEditMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowEditMode(false)}>

                    <EditUser courseId={Id} userId={selectedUserId!} setUserEdited={() => {
                        setShowEditMode(false);
                    }} />
                </Dialog>


            </Container>
        </div>
    )
}

export { QuizLevel }