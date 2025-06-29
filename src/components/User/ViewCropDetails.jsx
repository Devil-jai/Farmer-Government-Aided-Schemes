import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import img from "../assets/img.png"; // Ensure this image exists
import Loader from "../Loader";
import {
  FaSeedling,
  FaLeaf,
  FaCalendarAlt,
  FaTractor,
  FaFlask,
} from "react-icons/fa";

function ViewCropDetails() {
  const [cropList, setCropList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchCrops = async () => {
    try {
      const snapshot = await getDocs(collection(db, "cropDetails"));
      const crops = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCropList(crops);
    } catch (error) {
      toast.error("Failed to fetch crop details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  if (loading)
    return (
      <Loader/>
    );

  return (
    <div className="min-h-screen overflow-y-auto relative">
      <img
        src={img}
        alt="Background"
        onLoad={() => setImageLoaded(true)}
        className={`h-screen w-full object-cover fixed top-0 left-0 transition-opacity duration-700 ease-in-out z-0 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className="absolute top-0 left-0 w-full min-h-screen z-10 pt-16 pb-10 px-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <h1 className="lg:text-3xl text-2xl max-[600px]:text-xl max-[400px]:text-[16px] 2xl:text-5xl xl:text-4xl my-5 font-bold text-white text-center mb-10 tracking-wide drop-shadow">
          Available Crop Details
        </h1>

        {cropList.length === 0 ? (
          <p className="text-center text-gray-300">No crop details available.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {cropList.map((crop) => (
              <div
                key={crop.id}
                className="w-[280px] xl:w-[340px] p-5 bg-white border border-green-500 rounded-2xl shadow-md hover:shadow-green-600 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between gap-3 xl:gap-6 text-gray-900"
              >
                <div className="flex flex-col flex-wrap gap-3">
                  <div className="w-full text-green-700 font-bold text-lg text-center rounded-md py-2">
                    {crop.cropName}
                  </div>

                  <p className="text-sm flex items-start gap-2">
                    <FaSeedling className="text-lime-700 mt-1" />
                    <span>
                      <strong>Type:</strong> {crop.cropType}
                    </span>
                  </p>

                  <p className="text-sm flex items-start gap-2">
                    <FaCalendarAlt className="text-yellow-600 mt-1" />
                    <span>
                      <strong>Season:</strong> {crop.season}
                    </span>
                  </p>

                  <p className="text-sm flex items-start gap-2">
                    <FaLeaf className="text-emerald-600 mt-1" />
                    <span>
                      <strong>Soil Type:</strong> {crop.soilType}
                    </span>
                  </p>

                  {crop.fertilizer && (
                    <p className="text-sm flex items-start gap-2">
                      <FaFlask className="text-indigo-600 mt-1" />
                      <span>
                        <strong>Fertilizer:</strong> {crop.fertilizer}
                      </span>
                    </p>
                  )}

                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <FaTractor className="text-red-500 mt-1" />
                    <span>
                      <strong>Posted on:</strong>{" "}
                      {crop.createdAt?.toDate().toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewCropDetails;
