import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState(
        localStorage.products ? JSON.parse(localStorage.getItem("products")) : []
    );
    const [productInputs, setProductInputs] = useState({
        productImageUri: [],
        productName: '',
        productDescription: '',
        marketPrice: 0,
        sellingPrice: 0,
        productCategory: '',
        productFor: '',
    });

    useEffect(() => {
        axios.get("https://newecomwebapp.herokuapp.com/")
            .then(res => localStorage.setItem("products", JSON.stringify(res.data)))
    }, []);

    function allInputs(obj) {
        for (var o in obj) {
            if (!obj[o]) return false;
        }
        return true;
    }

    const addProduct = (e) => {
        e.preventDefault();
        if (!allInputs(productInputs)) alert("Fill all the inputs");
        if(products.includes(productInputs)) alert ("Product already added");
        else {
            axios({
                method: "POST",
                data: productInputs,
                url: "https://newecomwebapp.herokuapp.com/create/products"
            })
                .then(res => console.log(res.data));
        window.location = "/";
        }
    }

    const updateProduct = (e, productToUpdate, productId) => {
        e.preventDefault();
        if (!allInputs(productToUpdate)) alert("Fill all the inputs");
        else {
            axios({
                method: "POST",
                data: productToUpdate,
                url: `https://newecomwebapp.herokuapp.com/${productId}/edit/product`
            }).then(res => console.log(res.data));
        window.location = "/";
        }
    }

    const deleteProduct = (id, setShowModal) => {
        axios({
            method: "delete",
            url: `https://newecomwebapp.herokuapp.com/${id}/delete/product`
        }).then(res => console.log(res.data));
        setShowModal(false);
        window.location = "/";
    }

    return (
        <ProductContext.Provider value={{ products, setProducts, addProduct, productInputs, setProductInputs, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    )
}