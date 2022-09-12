import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../../api/apiData.js";
import "../../css/login.css";

export default function Login() {

    const [isRedirect, setIsRedirect] = useState(false);
    const [userLevel, setUserLevel] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorSection, setErrorSection] = useState("");
    const handleSubmit = async (e) => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let login_data = {
            email,
            password
        }
        let resp = await login(login_data);
        if (resp.remote === "failure") {
            setErrorMessage(resp.errors.errors.error)
            setErrorSection(resp.errors.errors.section)
            if(resp.errors.errors.section === "email"){
                let email_input = document.getElementById('email');
                email_input.className = "red-field-input";
            }else if(resp.errors.errors.section === "password"){
                let password_input = document.getElementById('password');
                password_input.className = "red-field-input";
            }
            
            
        }else{
            localStorage.setItem("token", resp?.data.token);
            localStorage.setItem("user_level", resp?.data.user_level);
            localStorage.setItem("user_name", resp?.data.user_name);
            setIsRedirect(true);
            setUserLevel(resp?.data.user_level)
            window.location.reload(false);
        }
        
    };
    const handleChange = async (e) => {
        let selected_input = document.getElementById(e);
        selected_input.className = "field-input";
        setErrorSection("")
    }
    if (isRedirect) {
        if (userLevel === "buyer") {
            return <Navigate to={'/'} />
        } else if (userLevel === "seller" || userLevel === "admin") {
            return <Navigate to={'/'} />
        }

    }
    return (
        <>
            <div className="login-view">
                <div className="container">
                    <h2 className="first-title">Login</h2>
                    <div className="input-container">
                        <h2>Correo</h2>
                        <input id="email" name="email" className="field-input" onKeyDown={() => handleChange("email")} />
                        <div id="email-error" className="error-container">
                            {errorSection === "email" && (
                                <p className="error-message">{errorMessage}</p>
                            )}
                        </div>
                    </div>
                    <div className="input-container">
                        <h2>Contraseña</h2>
                        <input type="password" id="password" name="password" className="field-input" onKeyDown={() => handleChange("password")} />
                        <div id="password-error" className="error-container">
                            {errorSection === "password" && (
                                <p className="error-message">{errorMessage}</p>
                            )}

                        </div>
                    </div>
                    <div className="input-container">
                        <button onClick={() => handleSubmit()} id="send-data">Iniciar Sesion</button>
                        <a href="/auth/sign-up">Registrar</a>
                    </div>

                </div>
            </div>
        </>
    );
}