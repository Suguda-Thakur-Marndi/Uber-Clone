import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else if (userType === 'driver') {
            navigate('/Driverhome')
        }
    }, [token, userType, navigate])

    if (!token || userType !== 'user') return null

    return <>{children}</>
}

export default UserProtectWrapper