import { useAppDispatch, useAppSelector } from "@hooks/app";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import './BookInfo.css'
import { Container } from "react-bootstrap";
import Cookie from 'cookie-universal'
import HeadingTitle from "@components/common/HeadingTitle/HeadingTitle";
import { Button } from "@components/index";


import actShowBook from "@store/book/act/actShowCourse";

const BookInfo = () => {
    const cookie = Cookie();
    const { book } = useAppSelector(state => state.book)
    const { language } = useAppSelector(state => state.language)
    const { id } = useParams();
    const indx = parseInt(id as string)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actShowBook(indx))

    }, [])
    const navigate = useNavigate()
    const showBuy = () => {
        if (cookie.get('token')) {
            navigate(`buy`)
        } else {
            navigate(`/login`)

        }
    }

    return (
        <div className="bookShow">
            <Container className="cont">
                <div className="left">
                    <div className="image">
                        <img src={book?.media[0]?.original_url!} alt="" />
                    </div>

                </div>
                <div className="right">
                    <HeadingTitle>{language === 'French' ? "détails:" : "التفاصيل:"}</HeadingTitle>
                    <div className="det">
                        <h2>{language === "French" ? book?.title : book?.title_ar}</h2>
                        <h3>{book?.author}</h3>
                        <p>{language === "French" ? book?.description : book?.description_ar}</p>
                        <h4>${book?.price}</h4>
                    </div>
                    <div onClick={showBuy} className="btns">
                        <Button >{language === "French" ? "acheter"
                            : "شراء"}</Button>
                    </div>
                </div>

            </Container>

        </div>
    )
}

export default BookInfo
