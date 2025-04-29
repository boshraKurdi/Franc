import './ProfileForm.css'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import Input from '@components/feedback/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Cookie from 'cookie-universal'
import { useState } from 'react'
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'
import { actChangeProfile, actDeleteAccount } from '@store/user/userSlice'
import { confirmDialog } from 'primereact/confirmdialog';
import { authLogout } from '@store/auth/authSlice'
import toast from 'react-hot-toast'
const schema = z.object({
    email: z.string({ required_error: 'required field', invalid_type_error: 'email is required!' }).email(),
    name: z.string({ required_error: 'required field', invalid_type_error: 'name is required!' }),

});

const ProfileForm = () => {
    const { language } = useAppSelector(state => state.language)
    const accept = () => {
        deleteAccountHandler();
    }
    const confirm = () => {
        confirmDialog({
            message: language === "French" ? 'Voulez-vous supprimer ce compte ?' : "هل أنت متأكد أنك تود حذف هذا الحساب؟",

            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            // reject
        });
    };
    type Inputs = z.infer<typeof schema>;
    type TUser = {
        email: string,
        name: string
    }
    const { userData } = useAppSelector(state => state.auth)
    const [email, setEmail] = useState(userData?.user.email!);
    const [name, setName] = useState(userData?.user.name!);

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });
    const dispatch = useAppDispatch();
    const data: TUser = {
        email,
        name
    }
    const onSubmit: SubmitHandler<Inputs> = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // throw new Error();
            // console.log(data)
            dispatch(actChangeProfile(data))
                .unwrap()
                .then(() => {
                    toast.success(language === "French" ? 'changer!' : "تم التغيير")
                })
            setEmail('')
            setName('')

        } catch (error) {
            setError("email", {
                message: 'This email is already taken'
            })
        }
    }

    const cookie = Cookie()
    const deleteAccountHandler = () => {

        dispatch(actDeleteAccount()).unwrap()
            .then(() => {
                navigate('/')
                cookie.remove('token')
                dispatch(authLogout())
            })
    }
    return (
        <div className='profileForm'>
            <div className="details">

                <div className="form-details">
                    <h3>{language === "French" ? "changer de profil" : " تغيير البروفايل"}</h3>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="inp">
                            <Input reg={register("name")}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type='text' placeholder={language === 'French' ? "Nom de l'étudiant" : "اسم الطالب"} />
                            {errors.name && <div className='error'>{errors.name.message}</div>}
                        </div>
                        <div className="inp">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                reg={register("email")} type="email" placeholder={language === 'French' ? "e-mail" : "الايميل"} />
                            {errors.email && <div className='error'>{errors.email.message}</div>}

                        </div>
                        <button
                            disabled={isSubmitting}
                        >

                            {language === 'French' && isSubmitting ? "Chargement..." :
                                language === 'Arabic' && isSubmitting ? "جاري التحميل..." :
                                    language === 'French' ? "changer" : "تغيير"}</button>
                    </form>
                    <div className="btns">
                        <Button onClick={confirm} label={language === "French" ? "supprimer le compte" : "حذف الحساب "}></Button>

                    </div>
                </div>

            </div >
        </div >
    )
}

export default ProfileForm
