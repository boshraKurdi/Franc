import './Register.css'
import { Input } from '@components/index'
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
import { actRegister } from '@store/auth/authSlice';
const schema = z.object({
    name: z.string({ required_error: 'required field', invalid_type_error: 'email is required!' }),
    email: z.string({ required_error: 'required field', invalid_type_error: 'email is required!' }).email(),
    password: z.string({ required_error: 'required field', invalid_type_error: 'password is required!' }).min(8),

});

type Inputs = z.infer<typeof schema>;
type TUser = {
    name: string,
    email: string,
    password: string
}

const Register = () => {
    const cookie = Cookie()
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
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
        name: name,
        email: email,
        password: password
    }
    const onSubmit: SubmitHandler<Inputs> = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // throw new Error();
            console.log(data)
            dispatch(actRegister(data))
                .unwrap()
                .then((res) => {
                    const token = res.authorisation.token;
                    cookie.set('token', token);
                    navigate('/')
                })
            setEmail('')
            setName('')
            setPassword('')

        } catch (error) {
            // setError("email", {
            //     message: 'This email is already taken'
            // })
        }
    }
    return (
        <section className='reg'>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="inp">
                        <Input
                            reg={register("name")}
                            onChange={(e) => setName(e.target.value)} type='text' placeholder={language === 'French' ? "nom d'utilisateur" : "اسم المستخدم"} />

                        {errors.name && <div className='error'>{errors.name.message}</div>}

                    </div>
                    <div className="inp">
                        <Input reg={register("email")}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email' placeholder={language === 'French' ? "e-mail" : "الايميل"} />
                        {errors.email && <div className='error'>{errors.email.message}</div>}

                    </div>
                    <div className="inp">
                        <Input
                            reg={register("password")}
                            onChange={(e) => setPassword(e.target.value)} type={!showEye ? 'password' : "text"} placeholder={language === 'French' ? "mot de passe" : "كلمة المرور"} />
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
                                language === 'French' ? "registre" : "تسجيل"}</button>
                </form>
            </Container>
        </section>
    )
}

export default Register
