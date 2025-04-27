import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const ProtectedRoute = ({ children }) => {
const{user}=useContext(AppContext)
  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute 