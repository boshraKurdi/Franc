import { Input } from '@components/index'
import './Login.css'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import EyeSlash from '@assets/svgs/eye-slash-svgrepo-com.svg?react';
import Eye from '@assets/svgs/eye-svgrepo-com.svg?react';
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { Container } from 'react-bootstrap'
import { useForm, SubmitHandler } from "react-hook-form";
import Cookie from 'cookie-universal';

import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { actLogin } from '@store/auth/authSlice';
const schema = z.object({
    email: z.string({ required_error: 'required field', invalid_type_error: 'email is required!' }).email(),
    password: z.string({ required_error: 'required field', invalid_type_error: 'password is required!' }).min(8),

});

type Inputs = z.infer<typeof schema>;
type TUser = {
    email: string,
    password: string
}
const Login = () => {
    const cookie = Cookie()
    const [email, setEmail] = useState('');
    const [showEye, setShowEye] = useState(false);
    const [password, setPassword] = useState('');

    const { language } = useAppSelector(state => state.language)
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
        email: email,
        password: password
    }
    const onSubmit: SubmitHandler<Inputs> = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // throw new Error();
            // console.log(data)
            dispatch(actLogin(data))
                .unwrap()
                .then((res) => {
                    const token = res.authorisation.token;
                    cookie.set('token', token);
                    if (res?.user.roles?.length) {
                        console.log('admin')
                        navigate('/dashboard/operations')
                    } else {
                        navigate('/')
                        console.log('user')

                    }
                })
            setEmail('')
            setPassword('')

        } catch (error) {
            setError("email", {
                message: 'This email is already taken'
            })
        }
    }
    return (
        <section className='login'>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="inp">
                        <Input reg={register("email")}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email' placeholder={language === 'French' ? "e-mail" : "الايميل"} />
                        {errors.password && <div className='error'>{errors.password.message}</div>}
                    </div>
                    <div className="inp">
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            reg={register("password")} type={!showEye ? 'password' : "text"} placeholder={language === 'French' ? "mot de passe" : "كلمة المرور"} />
                        {errors.password && <div className='error'>{errors.password.message}</div>}
                        {showEye ?
                            <EyeSlash onClick={() => setShowEye(!showEye)} style={{
                                position: "absolute",
                                cursor: 'pointer',
                                width: '23px',
                                left: language === 'Arabic' ? '13px' : "89%",
                                top: "16px"
                                , height: "23px"
                            }} />
                            : <Eye onClick={() => setShowEye(!showEye)} style={{
                                position: "absolute",
                                cursor: 'pointer',
                                width: '23px',
                                left: language === 'Arabic' ? '13px' : "89%",
                                top: "16px"
                                , height: "23px"
                            }} />}
                    </div>
                    <button
                        disabled={isSubmitting}
                    >

                        {language === 'French' && isSubmitting ? "Chargement..." :
                            language === 'Arabic' && isSubmitting ? "جاري التحميل..." :
                                language === 'French' ? "se connecter" : "تسجيل الدخول"}</button>
                    <p onClick={() => navigate('/register')} >{language === 'French' ? "créer un nouveau compte" : "انشاء حساب جديد"}</p>
                </form>
            </Container>
        </section>
    )
}

export default Login
