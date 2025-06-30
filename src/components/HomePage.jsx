import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import bgImage from '../components/assets/homePage_img.jpg';
import { Link } from 'react-router-dom';
import AboutUs_btn from './buttons/AboutUS_btn';
import Loader from './Loader'

const HomePage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

useEffect(() => {
  const img = new Image();
  img.src = bgImage;

  const loadImage = new Promise((resolve) => {
    img.onload = resolve;
  });

  const delay = new Promise((resolve) => {
    setTimeout(resolve, 1000); // minimum 2-second delay
  });

  Promise.all([loadImage, delay]).then(() => {
    setImageLoaded(true);
  });
}, []);

  return (
    <div className="relative text-white min-h-screen">
      {!imageLoaded && (
       
          <Loader/>
        
      )}

      {imageLoaded && (
        <>
          <img
            src={bgImage}
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 z-10" style={{ background: "rgba(0,0,0,0.6)" }} />

          <div className="relative z-20 flex flex-col justify-center items-center text-center px-4 py-10 min-h-screen">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow">
              Farmer Government Aided Schemes
            </h1>

            <p className="max-w-2xl text-[16px] sm:text-xl text-gray-200 mb-10">
              Empowering farmers with access to schemes and crop knowledge. Apply, track, and grow better.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/aboutUs">
                <AboutUs_btn />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
