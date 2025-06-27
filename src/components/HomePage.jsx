import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
     <div className='flex flex-col justify-center items-center mt-30'>
        <Link to='/user/login'>user</Link>
        <Link to='/login'>admin</Link>
    </div>
  )
}

export default HomePage