import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../../firebase';

function ViewApplicationStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserApplications = (user) => {
    const userAppRef = collection(db, 'users', user.uid, 'schemeApplications');
    getDocs(userAppRef)
      .then(snapshot => {
        const appList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
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

    return () => unsubscribe(); // cleanup
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading your applications...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Your Scheme Applications</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white shadow-md p-4 rounded border">
              <h2 className="text-xl font-semibold">{app.schemeName}</h2>
              <p><strong>Name:</strong> {app.applicantName}</p>
              <p><strong>Aadhaar:</strong> {app.aadhaar}</p>
              <p><strong>Mobile:</strong> {app.mobile}</p>
              <p><strong>Date Applied:</strong> {app.createdAt?.toDate().toLocaleString()}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={`font-semibold ${
                    app.status === 'approved'
                      ? 'text-green-600'
                      : app.status === 'rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {app.status || 'pending'}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewApplicationStatus;
