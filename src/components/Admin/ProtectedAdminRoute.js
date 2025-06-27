import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({children}) => {
    const [user , setUser] = useState(null);
    const [checking , setChecking ] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth ,  (currentUser) =>{
            setUser(currentUser)
            setChecking(false)
        })

        return () => unsubscribe()
    },[]);

    if(checking){
        return <p className="text-center mt-10">Checking accesss....</p>
    }

    if(!user || user.email !=='admin@gmail.com'){
        return <Navigate to='/admin/login' replace/>
    }

    return children

}

export default ProtectedAdminRoute;