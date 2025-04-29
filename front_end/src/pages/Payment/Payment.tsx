import './Payment.css'
import { Input } from '@components/index'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { Container } from 'react-bootstrap'
import { useForm, SubmitHandler } from "react-hook-form";
import Cookie from 'cookie-universal';

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { actAddPayment } from '@store/payment/paymentSlice';
import actShowBook from '@store/book/act/actShowCourse';
const schema = z.object({
    number: z.string({ required_error: 'required field', invalid_type_error: 'email is required!' }),
    type: z.string({ required_error: 'required field', invalid_type_error: 'email is required!' }),
    type_payment: z.string({ required_error: 'required field', invalid_type_error: 'email is required!' }),
    cvc: z.string({ required_error: 'required field', invalid_type_error: 'password is required!' }).min(8),

});

type Inputs = z.infer<typeof schema>;
type TUser = {
    number: number,
    type_payment: string,
    type: string,
    cvc: string,
    book_id: number,
    price: number
}

const Payment = () => {
    const cookie = Cookie()
    const [number, setNumber] = useState<null | number>(null);
    const [type, setType] = useState('');
    const [type_payment, setTypePayment] = useState('');
    const [cvc, setCvc] = useState('');
    const { book } = useAppSelector(state => state.book)
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
    const { id } = useParams()
    const indx = parseInt(id as string)
    const dispatch = useAppDispatch();
    const data: TUser = {
        number: number!,
        type: type,
        type_payment,
        cvc: cvc,
        book_id: indx,
        price: book?.price!
    }
    useEffect(() => {
        dispatch(actShowBook(indx))
    }, [])
    const onSubmit: SubmitHandler<Inputs> = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // throw new Error();
            console.log(data)
            dispatch(actAddPayment(data))
                .unwrap()
                .then((res) => {
                    const token = res.authorisation.token;
                    cookie.set('token', token);
                    navigate('/')
                })
            setNumber(null)
            setType('')
            setCvc('')

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
                            reg={register("number")}
                            onChange={(e) => setNumber(e.target.value)} type='number' placeholder={language === 'French' ? "numéro de téléphone" : "رقم الهاتف"} />

                        {errors.number && <div className='error'>{errors.number.message}</div>}

                    </div>


                    <div className="inp">
                        <Input
                            reg={register("cvc")}
                            onChange={(e) => setCvc(e.target.value)} type={"text"} placeholder={language === 'French' ? "cvc" : "cvc"} />
                        {errors.cvc && <div className='error'>{errors.cvc.message}</div>}

                    </div>
                    <select onChange={(e) => setType(e.target.value)}>
                        <option value="buy">{language === "French" ? "acheter" : "شراء"}</option>
                        <option value="borrow">{language === "French" ? "emprunter" : "استعارة"}</option>
                    </select>
                    <select onChange={(e) => setTypePayment(e.target.value)}>
                        <option value="paybal">{"paybal"}</option>
                        <option value="bank">{"bank"}</option>
                    </select>

                    <button
                        disabled={isSubmitting}
                    >

                        {language === 'French' && isSubmitting ? "Chargement..." :
                            language === 'Arabic' && isSubmitting ? "جاري التحميل..." :
                                language === 'French' ? "payer" : "ادفع"}</button>

                </form>
            </Container>
        </section>
    )
}

export default Payment
