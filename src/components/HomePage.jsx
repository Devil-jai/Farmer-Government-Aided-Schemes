import React from 'react';
import Navbar from '../components/Navbar'; // adjust path as needed
import bgImage from '../components/assets/homePage_img.jpg'; // background image

const HomePage = () => {
  return (
    <div className="relative  text-white ">
      <img
        src={bgImage}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0  z-10" style={{background:"rgba(0,0,0,0.6"}}/>

   

      <div className="relative z-20 flex flex-col justify-center items-center text-center px-4 py-10 min-h-screen">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow">
          Farmer Government Aided Schemes
        </h1>

        <p className="max-w-2xl text-[16px] sm:text-xl text-gray-200 mb-10">
          Empowering farmers with access to schemes and crop knowledge. Apply, track, and grow better.
        </p>
 <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/login"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-xl text-sm sm:text-base font-semibold shadow"
          >
            Admin
          </a>
        
          <a
            href="/user/login"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl text-sm sm:text-base font-semibold shadow"
          >
            User
          </a>
        </div>
       
      </div>
    </div>
  );
};

export default HomePage;
