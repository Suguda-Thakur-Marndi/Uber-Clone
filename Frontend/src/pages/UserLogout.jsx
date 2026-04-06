import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    const logout = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.status === 200) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }

    logout()
  }, [navigate])

  return <div>UserLogout</div>
}

export default UserLogout