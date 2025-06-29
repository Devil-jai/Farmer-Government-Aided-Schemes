import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../firebase";
import img from "../assets/img.png";
import Loader from "../Loader";

function UserDetails() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchFarmers = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "farmer"));
      const snapshot = await getDocs(q);
      const farmerList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFarmers(farmerList);
    } catch (error) {
      toast.error("Failed to load farmers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  if (loading)
    return (
     <Loader/>
    );

  return (
    <div className="min-h-screen w-full overflow-x-auto overflow-y-auto relative">
      {/* Background Image */}
      <img
        src={img}
        alt="Background"
        onLoad={() => setImageLoaded(true)}
        className={`fixed top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out z-0 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Dark Overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full z-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      />

      {/* Table Container */}
      <div className="relative w-full max-w-6xl mx-4 lg:mx-auto mt-24 text-gray-700 bg-white shadow-md rounded-xl overflow-x-auto z-20">
        <table className="w-full text-left min-w-[800px] table-auto">
          <thead>
            <tr>
              {[
                "First Name",
                "Last Name",
                "Email",
                "Address",
                "LandSize",
                "Phone",
                "Role",
              ].map((heading, index) => (
                <th
                  key={index}
                  className="p-4 border-b bg-blue-gray-50 text-sm text-blue-gray-900 font-normal opacity-70"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {farmers.map((data, index) => (
              <tr key={index}>
                <td className="p-4 border-b">{data?.firstName}</td>
                <td className="p-4 border-b">{data?.lastName}</td>
                <td className="p-4 border-b">{data?.email}</td>
                <td className="p-4 border-b">{data?.address}</td>
                <td className="p-4 border-b">{data?.landSize}</td>
                <td className="p-4 border-b">{data?.phone}</td>
                <td className="p-4 border-b">{data?.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDetails;
