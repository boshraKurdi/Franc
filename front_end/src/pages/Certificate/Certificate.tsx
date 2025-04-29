import { Container } from 'react-bootstrap'
import './Certificate.css'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import actGetCertificate from '@store/user/act/actGetCertificate'
import { Logo } from '@components/index'
const Certificate = () => {
    const { userData } = useAppSelector(state => state.auth)
    const { language } = useAppSelector(state => state.language)
    const { certificates } = useAppSelector(state => state.user)
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const indx = parseInt(id as string)
    useEffect(() => {
        dispatch(actGetCertificate(indx))

    }, [])
    return (
        <div className="certificate">
            <Container className='cont'>
                <div className="box">
                    <Logo />
                    <h1>{language === "French" ? "Certificat" : "شهادة"}</h1>
                    <h3 className="name">{userData?.user.name}</h3>
                    <div className="title">{language === "French" ? certificates?.target.course.title : certificates?.target.course.title_ar}</div>
                    <div className="description">{language === "French" ? certificates?.target.course.description : certificates?.target.course.description_ar}</div>
                    <div className="avarage">{language === "French" ? `moyenne :${certificates?.average}%` : `:المعدل %${certificates?.average} `} </div>
                </div>
            </Container>
        </div>
    )
}

export default Certificate
