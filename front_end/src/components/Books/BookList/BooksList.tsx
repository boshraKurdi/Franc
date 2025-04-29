import { useAppDispatch, useAppSelector } from "@hooks/app"
import { useEffect } from "react";
import { actCLearBooks } from "@store/book/bookSlice";
import actGetBooks from "@store/book/act/actGetCourses";
import { Col, Row } from "react-bootstrap";
import BookCard from "../BookCard/BookCard";

const BooksList = () => {
    const { books } = useAppSelector(state => state.book);

    const dispatch = useAppDispatch()
    useEffect(() => {
        const coursePromise = dispatch(actGetBooks())
        return () => {
            coursePromise.abort()
            dispatch(actCLearBooks())

        }
    }, [dispatch])
    const BooksCards = books?.map((book) => <Col lg={3} md={6} sm={12} key={book.id}>
        <BookCard  {...book} />
    </Col>
    )
    return (
        <Row className="BooksList ">
            {BooksCards}
        </Row>
    )
}

export default BooksList
