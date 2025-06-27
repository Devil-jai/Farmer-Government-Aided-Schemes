import { getAuth, signOut } from 'firebase/auth';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const auth = getAuth()
        signOut(auth).then(()=>{
            toast.success("Logged out successfully")
            navigate('/')
        }).catch((error)=>{
            toast.error('Failde to logout')
        })

    }
  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  )
}

export default Logout