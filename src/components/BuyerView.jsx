import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ProductEmpty from "../images/product-empty.jpg";
import { getProduct } from "../api/apiData";
import TextField from "@mui/material/TextField";
import "../css/buyer.css";

export default function BuyerView() {
    const [productsData, setProductsData] = useState([]);

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };

    const filteredData = productsData.filter((el) => {

        if (inputText === '') {
            return el.nombre;
        }
        
        else {
        
            if(el.nombre.toLowerCase().includes(inputText)){
                return el.nombre.toLowerCase().includes(inputText);
            }else if(el.sku.toLowerCase().includes(inputText)){
                return el.sku.toLowerCase().includes(inputText);
            }else if(el.precio.toString().includes(inputText)){
                return el.precio.toString().includes(inputText);
            }
        }
    })

    const getProductsData = async () => {
        let products = await getProduct(localStorage.getItem("token"),);
        if (products.remote === "success") {
            setProductsData(products.data.products);
        }
    }   

    useEffect(() => {
        getProductsData();

    }, [])


    if (localStorage.getItem("user_level") === "seller") {
        return <Navigate to={`/seller-view/`} />;
    }
    return (
        <>
            <div className="seller-view">
                <div className="search-container">
                    <TextField
                        id="outlined-basic"
                        onChange={inputHandler}
                        variant="outlined"
                        fullWidth
                        label="Search"
                    />
                </div>
                <div className="container">
                    {filteredData.map((pd, key) => (
                        <div className="product" key={`pr-${key}`}>
                            <div className="image-container">
                                <img src={ProductEmpty} />
                            </div>
                            <div className="data-container">
                                <h2>{pd.nombre}</h2>
                                <p className="sku">{pd.sku}</p>
                                <p className="price">$ {pd.precio}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}