  import React from 'react'
  import { Link } from 'react-router-dom'

  function AdminPage() {

      const cards = [
    { path: "/admin/userdetails", label: "UserDetails" },
    { path: "/admin/approveapplication", label: "ViewApplications" },
    { path: "/admin/postcropdetails", label: "PostCropDetails" },
    { path: "/admin/postgovernmentschemes", label: "PostGovernmentSchemes" },
  ];

   const cardClasses=` mt-5
        w-[254px] h-[200px] xl:w-[324px] xl:h-[270px] 
        
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
        active:scale-[0.95] active:rotate-[1.7deg]`
    return (
    
            <div className="h-screen  bg-white mt-30" style={{maxHeight:"70vh"}}>
          <div className="flex justify-around items-center flex-wrap h-screen" style={{maxHeight:"60vh"}}>
            {
              cards.map((item)=>(
<Link to={item.path}>
              {" "}
              <div
                className={cardClasses}
              >
                {item.label}
              </div>
            </Link>
              ))
            }
            
           
          </div>
        </div>
      
    )
  }

  export default AdminPage