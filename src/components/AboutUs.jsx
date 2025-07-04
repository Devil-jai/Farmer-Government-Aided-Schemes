import React, { useEffect, useState } from 'react';
import img from './assets/aboutUs.jpg';
import Loader from './Loader'; // Make sure this exists

function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = img;

    const loadImage = new Promise((resolve) => {
      image.onload = resolve;
    });

    const delay = new Promise((resolve) => {
      setTimeout(resolve, 1000); // ensure 2s minimum
    });

    Promise.all([loadImage, delay]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-20 flex p-10 justify-center items-center lg:flex-row flex-col-reverse space-x-10 gap-10">
          <div className="w-full">
            <img src={img} className="object-cover w-full h-full mx-auto ms-5" alt="About Us" />
          </div>
          <div className="w-full text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-green-600">About US</h1>
            <p className="mt-5 sm:text-[18px] max-[500px]:text-[14px]">
              Welcome to Agro-Web-App, your digital gateway to government-aided schemes and agricultural empowerment.
              Designed with both seasoned farmers and home growers in mind, our platform streamlines access to crucial
              crop, pesticide, and financial information. We aim to simplify the application process for government
              programs, offering real-time updates and detailed guidance on seasonal farming best practices. With a
              focus on usability, transparency, and accessibility, our goal is to bridge the gap between rural
              communities and technology—empowering users to make informed decisions that enhance productivity and
              improve livelihoods.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutUs;
