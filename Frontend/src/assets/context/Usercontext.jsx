/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'

export const UserDataContext=createContext()

const Usercontext = ({ children }) => {
  const [user, setUser] = useState({
    email:'',
    fullname:{
        firstName:'',
        lastName:''
    }
  })

  return (
    <UserDataContext.Provider value={{ user, setUser: setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default Usercontext