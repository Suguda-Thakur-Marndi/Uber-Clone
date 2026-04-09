import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token, navigate])

    if (!token) return null

    return <>{children}</>
}

export default UserProtectWrapper