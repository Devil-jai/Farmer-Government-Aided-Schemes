import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProtectedAdminRoutes = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  const allowedAdmins = ['admin@gmail.com'];

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u && !allowedAdmins.includes(u.email)) {
        toast.error('Access denied. Admins only.');
        setAccessDenied(true);
      }
      setUser(u);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) return <p className="text-center mt-10">Checking access...</p>;

  if (!user || accessDenied) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdminRoutes;
