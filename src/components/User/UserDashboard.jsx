import React from 'react'
import { Link } from 'react-router-dom'

function UserDashboard() {
  return (
     <div className='flex flex-col justify-center items-center'>
        <Link to='/user/viewcropdetails'>ViewCropDetails</Link>
        <Link to='/user/viewgovernmentschemes'>viewgovernmentschemes</Link>
        <Link to='/user/viewapplicationstatus'>viewapplicationstatus</Link>
     </div>
  )
}

export default UserDashboard