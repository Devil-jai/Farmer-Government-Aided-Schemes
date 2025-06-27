import { collectionGroup, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../../firebase';

function ViewApplicationCards() {
  const [applications, setApplication] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const snapshot = await getDocs(collectionGroup(db, 'schemeApplications'));
      const appList = snapshot.docs.map(doc => ({
        id: doc.id,
        ref: doc.ref,
        userId: doc.ref.path.split('/')[1],
        ...doc.data(),
      }));
      setApplication(appList);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (ref, newStatus) => {
    try {
      await updateDoc(ref, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      fetchApplications();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-[#fdf2f8] via-[#fce7f3] to-[#fae8ff]">
      <h2 className="font-bold text-center text-4xl text-purple-700 mb-12 mt-16 tracking-wide drop-shadow">
        Approve Scheme Applications
      </h2>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No applications found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {applications.map(app => (
            <div
              key={app.id}
              className="w-[280px] p-5 bg-white border-2 border-purple-300 rounded-2xl shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all duration-300 flex flex-col gap-3"
            >
              <div className="w-full  text-purple-700 font-bold text-lg text-center rounded-md py-2">
                {app.schemeName}
              </div>

              <p className="text-sm text-gray-700"><strong>👤 Name:</strong> {app.applicantName}</p>
              <p className="text-sm text-gray-700"><strong>🆔 User ID:</strong> {app.userId}</p>
              <p className="text-sm text-gray-700"><strong>🧾 Aadhaar:</strong> {app.aadhaar}</p>
              <p className="text-sm text-gray-700"><strong>📞 Mobile:</strong> {app.mobile}</p>
              <p className="text-sm font-semibold text-purple-700">
                <strong>📌 Status:</strong> {app.status || 'Pending'}
              </p>

              <div className="mt-3 flex gap-2">
                {app.status === 'approved' ? (
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md" disabled>
                     Approved
                  </button>
                ) : app.status === 'rejected' ? (
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-red-400 to-rose-600 hover:from-red-500 hover:to-rose-700 text-white text-sm font-semibold rounded-xl shadow-md" disabled>
                     Rejected
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => updateStatus(app.ref, 'approved')}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md"
                    >
                       Approve
                    </button>
                    <button
                      onClick={() => updateStatus(app.ref, 'rejected')}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-red-400 to-rose-600 hover:from-red-500 hover:to-rose-700 text-white text-sm font-semibold rounded-xl shadow-md"
                    >
                       Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewApplicationCards;
