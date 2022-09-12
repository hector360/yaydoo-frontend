
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../css/seller-view.css";
import ProductEmpty from "../images/product-empty.jpg";
import { getInventory } from "../api/apiData";

export default function SellerView() {
    const [productsData, setProductsData] = useState([]);

    const getProductsData = async () => {
        let products = await getInventory(localStorage.getItem("token"),);

        if (products.remote === "success") {
            setProductsData(products.data.products);
        }

    }  
    useEffect(() => {
        getProductsData();

    }, [])

    if (localStorage.getItem("user_level") === "buyer") {
        return <Navigate to={`/buyer-view/`} />;
    }
    if (localStorage.getItem("user_level") === "admin") {
        return <Navigate to={`/admin-view/`} />;
    }
    if (productsData.length === 0) {
        return (
            <>
                <div className="seller-view">
                    <div className="container">
                        <div className="image-container">
                            <img src={ProductEmpty} />
                        </div>
                        <div className="info-container">
                            <h2>Crea tu producto</h2>
                            <p>Organiza de manera profesional tu inventario</p>
                            <a href="/create-product">Crear Producto</a>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="products-view">
                    <div className="button-container">
                        <a href="/create-product">Crear Producto</a>
                    </div>
                    <div className="container">
                        <table>
                            <tr>
                                <th>Nombre del producto</th>
                                <th>SKU</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                            </tr>
                            {productsData?.map((pd, key) => (
                                <tr key={`$table-${key}`}>
                                    <td>{pd.nombre}</td>
                                    <td>{pd.sku}</td>
                                    <td>{pd.cantidad}</td>
                                    <td>{pd.precio}</td>
                                </tr>
                            ))}

                        </table>
                    </div>
                </div>
            </>
        );
    }



}