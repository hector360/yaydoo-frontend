
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { createProduct } from "../api/apiData";
import "../css/create-product.css";


export default function CreateProduct() {
    const [errorMessage, setErrorMessage] = useState("");
    const [errorSection, setErrorSection] = useState("");
    if (localStorage.getItem("user_level") === "buyer") {
        return <Navigate to={`/buyer-view/`} />;
    }
    

    const handleSubmit = async (e) => {
        let nombre = document.getElementById("nombre").value;
        let sku = document.getElementById("sku").value;
        let cantidad = document.getElementById("cantidad").value;
        let precio = document.getElementById("precio").value;

        let product_data = {
            nombre,
            sku,
            cantidad,
            precio
        }
        let resp = await createProduct(localStorage.getItem("token"), product_data);
        //response.status
        console.log("resp: ", resp)
        if (resp.remote === "failure") {
            setErrorMessage(resp.errors.errors.error)
            setErrorSection(resp.errors.errors.section)
            let input = document.getElementById(`${resp.data.section}`);
                input.className = "red-field-input";
            
        }
        if (resp.remote === "success") {
            window.location.href = "/seller-view";
        }
        
        
    };
    const handleChange = async (e) => {
        let selected_input = document.getElementById(e);
        selected_input.className = "field-input";
        setErrorSection("")
    }
    return (
        <>
            <div className="create-product-view">
                <div className="back-button"><a href="/seller-view">Atras</a></div>
                <div className="container">
                    <h2>Crear producto</h2>
                    <div className="input-container">
                        <h2>Name</h2>
                        <input id="nombre" name="nombre" className="field-input" onKeyDown={() => handleChange("nombre")} />
                        <div id="nombre-error" className="error-container">
                            {errorSection === "nombre" && (
                                <p className="error-message">{errorMessage}</p>
                            )}

                        </div>

                    </div>
                    <div className="input-container">
                        <h2>Sku</h2>
                        <input id="sku" name="sku" className="field-input" onKeyDown={() => handleChange("sku")} />
                        <div id="sku-error" className="error-container">
                            {errorSection === "sku" && (
                                <p className="error-message">{errorMessage}</p>
                            )}

                        </div>

                    </div>
                    <div className="input-container">
                        <h2>Cantidad</h2>
                        <input type="number" id="cantidad" name="cantidad" className="field-input" onKeyDown={() => handleChange("cantidad")} />
                        <div id="cantidad-error" className="error-container">
                            {errorSection === "cantidad" && (
                                <p className="error-message">{errorMessage}</p>
                            )}

                        </div>

                    </div>
                    <div className="input-container">
                        <h2>Precio</h2>
                        <input type="number" id="precio" name="precio" className="field-input" onKeyDown={() => handleChange("precio")} />
                        <div id="precio-error" className="error-container">
                            {errorSection === "precio" && (
                                <p className="error-message">{errorMessage}</p>
                            )}

                        </div>

                    </div>
                    <div className="input-container">
                        <button onClick={() => handleSubmit()} id="send-data">Crear Producto</button>                        
                    </div>
                </div>
            </div>
        </>
    );
}