import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context/Products/products";
import "./updateProduct.css";
import ImageComponent from "./ImageComp";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Col, Container, Row} from 'react-bootstrap';

export default function UpdateProduct(props) {
    const productId = props.match.params.id;
    const { updateProduct } = useContext(ProductContext);
    const [showInput, setShowInput] = useState(Boolean);
    const [imageInput, setImageInput] = useState("");
    const [productToUpdate, setProductToUpdate] = useState({
        productImageUri: [],
        productName: '',
        productDescription: '',
        marketPrice: 0,
        sellingPrice: 0,
        productCategory: '',
        productFor: '',
    });
    const {products} = useContext(ProductContext);

    useEffect(() => {
        products.map(el => {
            if(el._id === productId) setProductToUpdate({
                productImageUri: el.productImageUri,
                productName: el.productName,
                productDescription: el.productDescription,
                marketPrice: el.marketPrice,
                sellingPrice: el.sellingPrice,
                productCategory: el.productCategory,
                productFor: el.productFor,
            })
        })
    }, [])
    
    async function addImage(e) {
        e.preventDefault();
        let addNewImage = productToUpdate.productImageUri;
        addNewImage.push(imageInput);
        await setProductToUpdate({...productToUpdate, productImageUri: addNewImage})
    }

    function handleImageRemover(image) {
        let currentImageArray = productToUpdate.productImageUri;
        currentImageArray = currentImageArray.filter(el => el !== image)
        setProductToUpdate({...productToUpdate, productImageUri: currentImageArray});
    }

    return (
        <div className='update_product'>
            <Container>
            <h1>Update the product</h1>
            <form onSubmit={e => updateProduct(e, productToUpdate, productId)}>
                <input
                    placeholder="Product title"
                    name="productName"
                    onChange={e => setProductToUpdate({...productToUpdate, productName: e.target.value})}
                    value={productToUpdate.productName}
                    maxLength='30'
                />
                <textarea
                    placeholder='Product decription'
                    name="productDescription"
                    onChange={e => setProductToUpdate({...productToUpdate, productDescription: e.target.value})}
                    value={productToUpdate.productDescription}
                    rows='4'
                />
                <div className="container_update">
                    <Row>
                    {productToUpdate.productImageUri.map( image => {
                        return (
                            <Col l={3}>
                                <ImageComponent image={image} handleImageRemover={handleImageRemover} />
                            </Col>
                        )
                    })}
                    </Row>
                </div>
                    <div className="image_container">
                        <div className={showInput ? "show_input" : "add_icon"}>
                            {showInput ? (
                                <div>
                                    <div className="icon_container" onClick={() => setShowInput(false)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </div>
                                    <form>
                                        <input placeholder="Enter URL" onChange={e => setImageInput(e.target.value)} />
                                        <button type='submit' onClick={addImage}>Add Image</button>
                                    </form>
                                </div>
                            ) : (
                                <div onClick={() => setShowInput(true)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            ) }
                        </div>
                    </div>
                <input
                    type='number'
                    placeholder="Market Price"
                    name="marketPrice"
                    onChange={e => setProductToUpdate({...productToUpdate, marketPrice: e.target.value})}
                    value={productToUpdate.marketPrice}
                    min='0'
                />
                <input
                    type="number"
                    placeholder="Selling price"
                    name="sellingPrice"
                    onChange={e => setProductToUpdate({...productToUpdate, sellingPrice: e.target.value})}
                    value={productToUpdate.sellingPrice}
                    min='0'
                />
                <input
                    placeholder="Product Category"
                    name="productCategory"
                    onChange={e => setProductToUpdate({...productToUpdate, productCategory: e.target.value})}
                    value={productToUpdate.productCategory}
                />
                <input
                    placeholder="Gender"
                    name="productFor"
                    onChange={e => setProductToUpdate({...productToUpdate, productFor: e.target.value})}
                    value={productToUpdate.productFor}
                />
                <button type='submit'>Submit</button>
            </form>
            </Container>
        </div>
    )
}