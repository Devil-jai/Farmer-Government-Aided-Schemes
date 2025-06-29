import {
  addDoc,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import img from "../assets/img.png";
import toast from "react-hot-toast";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";
import {
  FaUserCheck,
  FaGift,
  FaFileSignature,
  FaCalendarAlt,
} from "react-icons/fa";
import Loader from "../Loader";

function ViewGovernmentSchemes() {
  const [schemedata, setSchemeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchScheme = async () => {
    try {
      const snapshot = await getDocs(collection(db, "governmentSchemes"));
      const scheme = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchemeData(scheme);
    } catch (error) {
      toast.error("Failed to fetch government Schemes");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast.error("User not logged in");
        return;
      }
      await addDoc(collection(db, "users", user.uid, "schemeApplications"), {
        ...data,
        schemeId: selectedScheme.id,
        schemeName: selectedScheme.schemeName,
        createdAt: Timestamp.now(),
      });
      toast.success("Applied successfully!");
      reset();
      setSelectedScheme(null);
    } catch (error) {
      console.log(error);
      toast.error("Application failed");
    }
  };

  useEffect(() => {
    fetchScheme();
  }, []);

  if (loading)
    return (
      <Loader/>
    );

  return (
    <div className=" h-screen overflow-y-auto relative">
      <img
        src={img}
        alt="Background"
        onLoad={() => setImageLoaded(true)}
        className={`h-screen w-full object-cover fixed top-0 left-0 transition-opacity duration-700 ease-in-out z-0 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className="absolute top-0 left-0 w-full min-h-screen z-10 pt-16 pb-10 px-4 "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <h1 className="lg:text-3xl text-2xl max-[600px]:text-xl max-[400px]:text-[16px] 2xl:text-5xl xl:text-4xl my-5 font-bold text-white text-center mb-10 tracking-wide drop-shadow">
          Available Government Schemes
        </h1>

        {schemedata.length === 0 ? (
          <p className="text-center text-gray-300">No government schemes found.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {schemedata.map((scheme) => (
              <div
                key={scheme.id}
                className="w-[280px] xl:w-[340px] p-5 bg-white border border-green-500 rounded-2xl shadow-md hover:shadow-green-600 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between gap-3 xl:gap-6 text-gray-900"
              >
                <div className="flex flex-col flex-wrap gap-3">
                  <div className="w-full text-green-600 font-bold text-lg text-center rounded-md py-2">
                  {scheme.schemeName}
                </div>

                <p className="text-sm flex items-start gap-2">
                  <FaUserCheck className="text-blue-700 mt-1" />
                  <span><strong>Eligibility:</strong> {scheme.eligibility}</span>
                </p>

                <p className="text-sm flex items-start gap-2">
                  <FaGift className="text-green-700 mt-1" />
                  <span><strong>Benefits:</strong> {scheme.benefits}</span>
                </p>

                <p className="text-sm flex items-start gap-2">
                  <FaFileSignature className="text-purple-600 mt-1" />
                  <span><strong>Application Procedure:</strong> {scheme.applicationProcedure}</span>
                </p>

                <p className="text-sm text-gray-600 flex items-start gap-2">
                  <FaCalendarAlt className="text-red-500 mt-1" />
                  <span><strong>Posted on:</strong> {scheme.createdAt?.toDate().toLocaleString()}</span>
                </p>
                </div>

                <button
                  onClick={() => setSelectedScheme(scheme)}
                  className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedScheme && (
  <div
    className="fixed inset-0 flex items-center  justify-center z-50 mt-20"
    style={{ background: "rgba(0, 0, 0, 0.7)" }}
  >
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative flex flex-grow gap-3 flex-col">
      <button
        onClick={() => setSelectedScheme(null)}
        className="absolute top-2 right-3 text-gray-500 hover:text-black"
      >
        ✖
      </button>

      <h2 className="text-xl font-bold mb-4 text-center text-green-700">
        Apply for {selectedScheme.schemeName}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm">Scheme Name</label>
          <input
            value={selectedScheme.schemeName}
            disabled
            className="py-1 px-3 border rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm">Your Name</label>
          <input
            {...register("applicantName", { required: "Name is required" })}
            className="py-1 px-3 border rounded-xl"
            placeholder="e.g., Raj Kumar"
          />
          {errors.applicantName && (
            <p className="text-red-500 text-sm mt-1">{errors.applicantName.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm">Aadhaar Number</label>
          <input
            {...register("aadhaar", {
              required: "Aadhaar is required",
              pattern: {
                value: /^\d{4}-\d{4}-\d{4}$/,
                message: "Format: 1234-5678-9012",
              },
            })}
            className="py-1 px-3 border rounded-xl"
            placeholder="1234-5678-9012"
          />
          {errors.aadhaar && (
            <p className="text-red-500 text-sm mt-1">{errors.aadhaar.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm">Mobile Number</label>
          <input
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Invalid mobile number",
              },
            })}
            className="py-1 px-3 border rounded-xl"
            placeholder="9876543210"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl"
        >
          Submit Application
        </button>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default ViewGovernmentSchemes;
