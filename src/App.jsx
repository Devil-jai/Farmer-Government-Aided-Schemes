import { useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Login from "./components/Admin/Login";
import { Toaster } from "react-hot-toast";
import Register from "./components/User/Register";
import UserLogin from "./components/User/UserLogin";
import PostCropDetails from "./components/Admin/PostCropDetails";
import PostGovernmentScheme from "./components/Admin/PostGovernmentScheme";
import ViewCropDetails from "./components/User/ViewCropDetails";
import ViewGovernmentSchemes from "./components/User/ViewGovernmentSchemes";
import ApproveApplications from "./components/Admin/ApproveApplications";
import ViewApplicationStatus from "./components/User/ViewApplicationStatus";
import AdminPage from "./components/Admin/AdminPage";
import ProtectedAdminRoutes from "./components/ProtectedAdminRoutes";
import HomePage from "./components/HomePage";
import UserDashboard from "./components/User/UserDashboard";
import UserDetails from "./components/Admin/UserDetails";
import Navbar from "./components/Navbar";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";

function AppContent() {
  const location = useLocation()
  const noHEaderFooterRoutes = ['/login','/user/login','/user/registration']
  const hideHeaderFooter = noHEaderFooterRoutes.includes(location.pathname)
  return (
    <>
     {!hideHeaderFooter && <Navbar/>}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoutes>
                <AdminPage />
              </ProtectedAdminRoutes>
            }
          />
          <Route
            path="/admin/userdetails"
            element={
              <ProtectedAdminRoutes>
                <UserDetails />
              </ProtectedAdminRoutes>
            }
          />
          <Route
            path="/admin/postcropdetails"
            element={
              <ProtectedAdminRoutes>
                <PostCropDetails />
              </ProtectedAdminRoutes>
            }
          />
          <Route
            path="/admin/postgovernmentschemes"
            element={
              <ProtectedAdminRoutes>
                <PostGovernmentScheme />
              </ProtectedAdminRoutes>
            }
          />
          <Route
            path="/admin/approveapplication"
            element={
              <ProtectedAdminRoutes>
                <ApproveApplications />
              </ProtectedAdminRoutes>
            }
          />
          <Route path="/user/registration" element={<Register />} />
          {/* <Route path="/userdashboard" element={<UserDashboard />} /> */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/viewcropdetails" element={<ProtectedUserRoute><ViewCropDetails /></ProtectedUserRoute>} />
          <Route
            path="/user/viewgovernmentschemes"
            element={<ProtectedUserRoute><ViewGovernmentSchemes /></ProtectedUserRoute>}
          />
          <Route
            path="/user/viewapplicationstatus"
            element={<ProtectedUserRoute><ViewApplicationStatus /></ProtectedUserRoute>}
          />
        </Routes>
   
      <Toaster />

      {/* {!hideHeaderFooter && <Footer/>} */}
    </>
  );
} 

export default function App(){
  return(
    <Router>
      <AppContent/>
    </Router>
  )
}
