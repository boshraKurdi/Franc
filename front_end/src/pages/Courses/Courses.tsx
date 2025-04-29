import CoursesList from "@components/Courses/CourseList/CoursesList"
import { Container } from "react-bootstrap"
import './Courses.css'
const Courses = () => {
    return (
        <div className="courses">
            <Container >
                <CoursesList />
            </Container>
        </div>

    )
}

export default Courses
