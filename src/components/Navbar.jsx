import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user , setUser] = useState(null)

  useEffect(()=>{
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth , (u)=>{
      setUser(u)
    })
    return () => unsubscribe()
  },[])

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white   shadow-md fixed top-0 left-0 w-full z-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold">Agro-Web-App</div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/user/viewcropdetails" className="hover:text-primary">Crop Info</Link>
            <Link to="/user/viewgovernmentschemes" className="hover:text-primary">Govt Schemes</Link>
          
            <Link to="/user/viewapplicationstatus" className="hover:text-primary">Status</Link>
          </div>

          <div className="hidden md:flex space-x-4">
            {
              user ? (
                <Logout/>
              ): (
                <Link to="/user/login" className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500">Login</Link>
           
              )
            }
            
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block">Home</Link>
          <Link to="/crop-info" className="block">Crop Info</Link>
          <Link to="/schemes" className="block">Govt Schemes</Link>
          <Link to="/apply" className="block">Apply</Link>
          <Link to="/status" className="block">Status</Link>
          <Link to="/login" className="block">Login</Link>
          <Link to="/register" className="block">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
