import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
// import BuyerView from "../components/BuyerView";
// import SellerView from "../components/SellerView";
// import Dashboard from "../components/Dashboard";


export default function Auth() {

  
    if (localStorage.getItem("user_level") === "buyer") {
      return <Navigate to={`/buyer-view/`} />;
    } else if (localStorage.getItem("user_level") === "seller") {
      return <Navigate to={`/seller-view/`} />;
    } else if (localStorage.getItem("user_level") === "admin") {
      return <Navigate to={`/admin-view/`} />;
    }
  
  
  return (
    <div className="login-bg  d-flex align-items-center">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" expect element={<Login />} />
        
        
      </Routes>
    </div>
  );

}
