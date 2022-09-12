
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import routes from "../utils/routes";
import Error from "../components/Error";
import "../css/home.css";

export default function Home() {
    const [userName, setUserName] = useState("");

    const handlerLogOut = () => {
        localStorage.setItem("token", null);
        localStorage.setItem("user_level", null);
        localStorage.clear();
        window.location.href = "/";
    }
    useEffect(() => {
        setUserName(localStorage.getItem("user_name"))
    }, [])
    return (
        <>
            <div className="home-container">
                <div className="header-container">
                    <div className="logo-section">
                        <p>¡Hola {userName} !</p>
                    </div>
                    <div className="user-section">
                        <button onClick={() => handlerLogOut()}>Logout</button>
                    </div>
                </div>
                <div className="body-container">
                    <Routes>
                        {routes.map((route, i) => {
                            return (
                                <Route
                                    path={route.path}
                                    element={route.component}
                                    key={i}
                                />
                            );
                        })}

                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}