import Header from '@components/Admin/Header/Header'
import SideBar from '@components/Admin/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import './Dashboard.css'
import { Col, Row } from 'react-bootstrap'
import { useState } from 'react'
const Dashboard = () => {
    const [show, setShow] = useState(true);
    const showHandler = () => {
        setShow(!show)
    }
    return (
        <Row className='dash'>
            <Col lg="3">
                <SideBar show={show} showHandler={showHandler} />
            </Col>
            <Col style={{ transition: ".1s" }} lg={show ? '9' : "12"}>
                <Header show={show} showHandler={showHandler} />
                <Outlet />
            </Col>

            {/* <Col lg="3" className="sides">
                side
            </Col>
            <Col lg="9" className="con">
                <header>header</header>
                <section>section</section>
            </Col> */}
        </Row>
    )
}

export default Dashboard
