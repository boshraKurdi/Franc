import { Footer, Header } from "@components/index"
import { Outlet } from "react-router-dom"

const Home = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Home
