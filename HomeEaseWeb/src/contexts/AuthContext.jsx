import React, { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}


export default function AuthProvider({ children }) {

    const [user, setUser] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      const storedUser = localStorage.getItem("user")
      if(storedUser){
        setUser(JSON.parse(storedUser))
        setIsLoggedIn(true)
      }
    },[])

    useEffect(() => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
      }
    }, [user])

  return (
    <AuthContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
  
}

