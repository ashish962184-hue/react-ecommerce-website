import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

// Simple hook to use the Auth context anywhere in our app
export function useAuth() {
  let context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return context
}
