import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const toastShownRef = useRef(false); // ✅ Ref to track toast

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) return <p className="text-center mt-10">Checking access...</p>;

  if (!user) {
    if (!toastShownRef.current) {
      toast.error("Please login to access this page.");
      toastShownRef.current = true; // ✅ Prevent further toasts
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedUserRoute;
