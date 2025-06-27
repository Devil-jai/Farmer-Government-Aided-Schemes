  import React from 'react'
  import { Link } from 'react-router-dom'

  function AdminPage() {
    return (
    
            <div className="h-screen  bg-white mt-30" style={{maxHeight:"70vh"}}>
          <div className="flex justify-around items-center flex-wrap h-screen" style={{maxHeight:"60vh"}}>
            <Link to="/admin/userdetails">
              {" "}
              <div
                className=" mt-5
        w-[254px] h-[200px] 
        bg-primary border border-white 
        shadow-[12px_17px_51px_rgba(0,0,0,0.22)] 
        backdrop-blur-[6px] 
        rounded-[17px] 
        text-center 
        flex items-center justify-center 
        font-bold text-white 
        cursor-pointer 
        transition-all duration-500 
        select-none 
        hover:border-black hover:scale-[1.05] 
        active:scale-[0.95] active:rotate-[1.7deg]
      "
              >
                UserDetails
              </div>
            </Link>
            <Link to="/admin/approveapplication  ">
              {" "}
              <div
                className=" mx-3 mt-5
        w-[254px] h-[200px] 
        bg-primary border border-white 
        shadow-[12px_17px_51px_rgba(0,0,0,0.22)] 
        backdrop-blur-[6px] 
        rounded-[17px] 
        text-center 
        flex items-center justify-center 
        font-bold text-white 
        cursor-pointer 
        transition-all duration-500 
        select-none 
        hover:border-black hover:scale-[1.05] 
        active:scale-[0.95] active:rotate-[1.7deg]
      "
              >
                ViewApplications
              </div>
            </Link>
            <Link to="/admin/postcropdetails">
              {" "}
              <div
                className=" mt-5
        w-[254px] h-[200px] 
        bg-primary border border-white 
        shadow-[12px_17px_51px_rgba(0,0,0,0.22)] 
        backdrop-blur-[6px] 
        rounded-[17px] 
        text-center 
        flex items-center justify-center 
        font-bold text-white 
        cursor-pointer 
        transition-all duration-500 
        select-none 
        hover:border-black hover:scale-[1.05] 
        active:scale-[0.95] active:rotate-[1.7deg]
      "
              >
                PostCropDetails
              </div>
            </Link>
            <Link to="/admin/postgovernmentschemes">
              {" "}
              <div
                className=" mt-5
        w-[254px] h-[200px] 
        bg-primary border border-white 
        shadow-[12px_17px_51px_rgba(0,0,0,0.22)] 
        backdrop-blur-[6px] 
        rounded-[17px] 
        text-center 
        flex items-center justify-center 
        font-bold text-white 
        cursor-pointer 
        transition-all duration-500 
        select-none 
        hover:border-black hover:scale-[1.05] 
        active:scale-[0.95] active:rotate-[1.7deg]
      "
              >
                PostGovernmentSchemes
              </div>
            </Link>
          </div>
        </div>
      
    )
  }

  export default AdminPage