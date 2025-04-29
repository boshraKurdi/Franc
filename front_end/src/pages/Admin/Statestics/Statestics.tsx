import { useAppDispatch, useAppSelector } from "@hooks/app";
import Line from "../../../components/Admin/States/Line/Line";

import './Statestics.css'
import { useEffect, useState } from "react";
import actGetStates from "@store/dashboard/actGetStates/actGetStates";
import { Container } from "react-bootstrap";
import { TLineProps, TPieProps } from "@customtypes/stateType";
import Pie from "@components/Admin/States/Pie/Pie";
import Curve from "@components/Admin/States/Curve/Curve";
import HorizontalBar from "@components/Admin/States/HorizontalBar/HorizontalBar";
import VerticalBar from "@components/Admin/States/VerticalBar/VerticalBar";
export default function Statestics() {
    const initialLine: TLineProps = {
        label: null,
        data: null,
        labels: null,
    }
    const initialPie: TPieProps = {
        data: null,
        labels: null,
    }
    const dispatch = useAppDispatch()
    const { states } = useAppSelector(state => state.dashboard)
    const [totalInfoLine, setTotalInfoLine] = useState(initialLine)
    const [totalTestsLine, setTotalTestsLine] = useState(initialLine)
    const [progCurve, setProgCurve] = useState(initialLine)
    const [horizon, setHorizon] = useState(initialLine)
    const [coursesCompelted, setCoursesCompelted] = useState(initialPie)
    const { language } = useAppSelector(state => state.language)
    useEffect(() => {
        dispatch(actGetStates())
    }, [dispatch])
    useEffect(() => {
        if (states) {
            setTotalInfoLine(
                {
                    data: [states?.total_users, states?.total_courses, states?.total_units, states?.total_lessons],
                    label: language === "French" ? "informations totales" : "كل المعلومات",
                    labels: language === "French" ? ["utilisateurs", "cours", "unités", "leçons"] : ["المستخدمين", "الكورسات", "الوحدات", "الدروس"]
                }
            )
            setTotalTestsLine(
                {
                    data: [states?.total_tests, states?.level_tests, states?.unit_tests, states?.lesson_tests],
                    labels: language === "French" ? ["tests totaux", "cours quiz", "unités quiz", "leçons quiz"] : ["كل الاختبارات", " اختبارات الكورسات", "اختبارات الوحدات", " اختبارات الدروس"],
                    label: language === "French" ? "tests" : " الاختبارات",
                }
            )
            setCoursesCompelted(
                {
                    data: states.course_completion.map(course => course.completed_users),
                    labels: states.course_completion.map(course => course.course)
                }
            )
            setProgCurve(
                {
                    data: states.get_daily_tests_stats.map(gr => gr.y),
                    labels: states.get_daily_tests_stats.map(gr => gr.x),
                    label: language === "French" ? "états des tests quotidiens" : "نسبة الاختبارات اليومية",
                }
            )
            setHorizon(
                {
                    data: states.get_user_grow_th_per_month.map(gr => gr.y),
                    labels: states.get_user_grow_th_per_month.map(gr => gr.x),
                    label: language === "French" ? "le nombre total d'utilisateurs augmente par mois" : "نمو المستخدمين خلال الشهر",
                }
            )
        }

    }, [states, language])
    return (
        <div className="states">
            <Container>
                <div className="lines">
                    <Line {...totalInfoLine} />
                    <Line {...totalTestsLine} />
                </div>
                <Pie {...coursesCompelted} />
                <Curve {...progCurve} />
                <HorizontalBar {...horizon} />
                <VerticalBar {...states!} />

            </Container>
        </div>
    )
}
