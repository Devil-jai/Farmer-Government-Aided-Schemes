import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../firebase";
import img from "../assets/img.png"; // Use same background
import {
  FaUserCheck,
  FaCalendarAlt,
  FaMobileAlt,
  FaIdCard,
} from "react-icons/fa";
import Loader from "../Loader";

function ViewApplicationStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchUserApplications = (user) => {
    const userAppRef = collection(db, "users", user.uid, "schemeApplications");
    getDocs(userAppRef)
      .then((snapshot) => {
        const appList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(appList);
      })
      .catch((error) => {
        console.error("Error fetching application status:", error);
        toast.error("Failed to load application status");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserApplications(user);
      } else {
        toast.error("User not logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
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
          Your Scheme Applications
        </h1>

        {applications.length === 0 ? (
          <p className="text-center text-gray-300">No applications found.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {applications.map((app) => (
              <div
                key={app.id}
                className="w-[280px] xl:w-[340px] p-5 bg-white border border-blue-400 rounded-2xl shadow-md hover:shadow-blue-600 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-4 text-gray-900"
              >
                <div className="text-blue-600 font-bold text-lg text-center rounded-md py-2">
                  {app.schemeName}
                </div>

                <p className="text-sm flex items-start gap-2">
                  <FaUserCheck className="text-green-700 mt-1" />
                  <span><strong>Name:</strong> {app.applicantName}</span>
                </p>

                <p className="text-sm flex items-start gap-2">
                  <FaIdCard className="text-purple-600 mt-1" />
                  <span><strong>Aadhaar:</strong> {app.aadhaar}</span>
                </p>

                <p className="text-sm flex items-start gap-2">
                  <FaMobileAlt className="text-yellow-600 mt-1" />
                  <span><strong>Mobile:</strong> {app.mobile}</span>
                </p>

                <p className="text-sm flex items-start gap-2">
                  <FaCalendarAlt className="text-red-500 mt-1" />
                  <span><strong>Applied On:</strong> {app.createdAt?.toDate().toLocaleString()}</span>
                </p>

                <div className="mt-2 text-sm text-center">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold px-3 py-1 rounded-full ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status || "pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewApplicationStatus;
