import { useAppDispatch, useAppSelector } from "@hooks/app"
import CourseCard from "../CourseCard/CourseCard";
import { useEffect } from "react";
import { actCLearCourse, actGetCourses } from "@store/course/courseSlice";

const CoursesList = () => {
    const { courses } = useAppSelector(state => state.course);
    const dispatch = useAppDispatch()
    useEffect(() => {
        const coursePromise = dispatch(actGetCourses())
        return () => {
            coursePromise.abort()
            dispatch(actCLearCourse())

        }
    }, [dispatch])
    const CoursesCards = courses?.map((course) => <CourseCard key={course.id} {...course} />)
    return (
        <div className="CourseList">
            {CoursesCards}
        </div>
    )
}

export default CoursesList
