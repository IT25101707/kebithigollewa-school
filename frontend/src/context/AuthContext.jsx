import { createContext, useContext, useState } from 'react'
import { login as apiLogin, logout as apiLogout, currentUser } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(currentUser())

  const login = async (username, password) => {
    const u = await apiLogin(username, password)
    setUser(u)
    return u
  }
  const logout = () => { apiLogout(); setUser(null) }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
