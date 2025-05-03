import { Input } from '@components/index'
import './Payment.css'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { Container } from 'react-bootstrap'
import { useForm, SubmitHandler } from "react-hook-form";

import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { actAddPayment } from '@store/payment/paymentSlice';
import toast from 'react-hot-toast';
const schema = z.object({
    cvc: z.string({ required_error: 'required field', invalid_type_error: 'cvc is required!' }),
    type: z.string({ required_error: 'required field', invalid_type_error: 'type is required!' }),
    type_payment: z.string({ required_error: 'required field', invalid_type_error: 'type payment is required!' }),
    number: z.string({ required_error: 'required field', invalid_type_error: ' number is required!' }),
    price: z.string({ required_error: 'required field', invalid_type_error: 'price is required!' }),

});

type Inputs = z.infer<typeof schema>;
type TUser = {
    cvc: string,
    type: string,
    type_payment: string,
    number: number,
    price: number,
    book_id: number
}
const Payment = () => {
    const [cvc, setCvc] = useState('');
    const [type, setType] = useState('');
    const [type_payment, setTypePayment] = useState('');
    const [price, setPrice] = useState<null | number>(null);
    const [number, setNumber] = useState<null | number>(null);

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
        cvc,
        price: price!,
        type: type,
        type_payment,
        number: number!,
        book_id: indx
    }
    const typeHandler = (e: any) => {
        setType(e.target.value)
        console.log(type)
        console.log("hello")


    }
    const onSubmit: SubmitHandler<Inputs> = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // throw new Error();
            console.log(data)
            dispatch(actAddPayment(data))
                .unwrap()
                .then(() => {
                    toast.success('success!')
                })


        } catch (error) {
            setError("price", {
                message: 'This price is already taken'
            })
        }
    }
    return (
        <section className='reg'>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="inp">
                        <Input reg={register("number")}
                            onChange={(e) => setNumber(e.target.value)}
                            type='number' placeholder={language === 'French' ? "numéro de téléphone" : "رقم الهاتف"} />
                        {errors.number && <div className='error'>{errors.number.message}</div>}
                    </div>
                    <div className="inp">
                        <Input
                            onChange={(e) => setCvc(e.target.value)}
                            reg={register("cvc")} type={"text"} placeholder={language === 'French' ? "cvc" : "cvc"} />
                        {errors.cvc && <div className='error'>{errors.cvc.message}</div>}

                    </div>
                    <div className="inp">
                        <Input
                            onChange={(e) => setPrice(e.target.value)}
                            reg={register("price")} type={"number"} placeholder={language === 'French' ? "prix" : "السعر"} />
                        {errors.price && <div className='error'>{errors.price.message}</div>}

                    </div>



                    <div className="inp">
                        <select
                            {...register('type')}
                            onChange={(e) => {
                                setType(e.target.value)
                                console.log(type);

                            }}
                        >
                            <option
                                value="">{language === 'French' ? 'type' : "النوع"}</option>
                            <option
                                value="buy">{language === 'French' ? 'acheter' : "شراء"}</option><option


                                    value="metaphor">{language === 'French' ? 'emprunt' : "استعارة"}</option>
                        </select>
                    </div>
                    <div className="inp">
                        <Input
                            onChange={(e) => setTypePayment(e.target.value)}
                            reg={register("type_payment")} type={"text"} placeholder={language === 'French' ? "Mode de paiement" : "نوع الدفع"} />
                        {errors.type_payment && <div className='error'>{errors.type_payment.message}</div>}

                    </div>
                    <button
                        disabled={isSubmitting}
                    >

                        {language === 'French' && isSubmitting ? "Chargement..." :
                            language === 'Arabic' && isSubmitting ? "جاري التحميل..." :
                                language === 'French' ? "Paiement" : "دفع"}</button>
                </form>
            </Container>
        </section>
    )
}

export default Payment
