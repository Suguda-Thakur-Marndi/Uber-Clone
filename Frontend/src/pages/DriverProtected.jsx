import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DriverDataContext } from '../assets/context/Drivercontext'

const DriverProtected = ({ children }) => {
    const { setDriver } = useContext(DriverDataContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const verifyDriver = async () => {
            if (!token) {
                navigate('/driver-sign')
                setIsChecking(false)
                return
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/drivers/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setDriver(response.data.driver)
            } catch (error) {
                localStorage.removeItem('token')
                setDriver(null)
                navigate('/driver-sign')
            } finally {
                setIsChecking(false)
            }
        }

        verifyDriver()
    }, [token, navigate, setDriver])

    if (isChecking) return null

    if (!token) return null

    return <>{children}</>
}

export default DriverProtected