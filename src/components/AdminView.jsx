import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ProductEmpty from "../images/product-empty.jpg";
import { getProduct, getUsers } from "../api/apiData";
import TextField from "@mui/material/TextField";
import "../css/admin.css";

export default function AdminView() {
    const [productsData, setProductsData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [inputText, setInputText] = useState("");
    const [usersArray, setUsersArray] = useState([]);

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredData = productsData.filter((el) => {

        if (inputText === '') {
            return el.nombre;
        }

        else {
            if (el.nombre.toLowerCase().includes(inputText)) {
                return el.nombre.toLowerCase().includes(inputText);
            } else if (el.sku.toLowerCase().includes(inputText)) {
                return el.sku.toLowerCase().includes(inputText);
            } else if (el.precio.toString().includes(inputText)) {
                return el.precio.toString().includes(inputText);
            }
        }
    })

    const handleCheckbox = (event) => {
        if(usersArray.indexOf(event) < 0){
            setUsersArray(usersArray => [...usersArray, event]);
        }
        
    }

    const getProductsData = async () => {
        let products = await getProduct(localStorage.getItem("token"));
        let users = await getUsers(localStorage.getItem("token"));

        if (users.remote === "success") {
            setUsersData(users.data);
        }
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
                <div className="left-container">
                    <div className="users-container">
                        <table>
                            <tr>
                                <th>User</th>
                                <th> </th>
                            </tr>
                            {usersData.map((ud, key) => (
                                <tr key={`users-${key}`}>
                                    <td>{ud.full_name}</td>
                                    <td><input type="checkbox" value="second_checkbox" onChange={() => handleCheckbox(ud._id)} /></td>
                                </tr>
                            
                        ))}
                        </table>
                        
                    </div>
                </div>
                <div className="right-container">
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


            </div>
        </>
    );
}