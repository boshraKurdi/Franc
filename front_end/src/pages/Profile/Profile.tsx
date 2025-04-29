import LeftSide from '@components/Profile/LeftSide/LeftSide'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { actGetProfile } from '@store/user/userSlice'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import './Profile.css'
import RightSide from '@components/Profile/RightSide/RightSide'
const Profile = () => {
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actGetProfile())
    }, [])
    return (
        <div className='profile'>
            <Container className='cont'>
                <LeftSide {...user!} />
                <RightSide {...user!} />
            </Container>
        </div>
    )
}

export default Profile
