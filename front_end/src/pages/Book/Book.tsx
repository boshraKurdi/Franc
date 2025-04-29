import { Container } from 'react-bootstrap'
import './Book.css'
import BooksList from '@components/Books/BookList/BooksList'
const Book = () => {
    return (
        <div className='book'>
            <Container>
                <BooksList />

            </Container>
        </div>
    )
}

export default Book
