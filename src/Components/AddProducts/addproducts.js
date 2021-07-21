import React, { useContext, useState } from 'react';
import { ProductContext } from '../../Context/Products/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import './addProducts.css';

function addproducts() {

    const { productInputs, setProductInputs, addProduct } = useContext(ProductContext);
    const [input, setInput] = useState("");
    const [imageInput, setImageInput] = useState([]);


    const handleImageChange = e => {
        setInput(e.target.value)
    }

    const handleImageInput = e => {
        e.preventDefault();
        if (!input) return;
        if (imageInput.length <= 5) {
            imageInput.push(input)
            setImageInput(imageInput)
            setInput("");
        }
        if (imageInput.length >= 2) {
            setProductInputs(prev => ({ ...prev, productImageUri: imageInput }))
        }
        console.log(imageInput)
    }

    const handleChangee = e => {
        const { name, value } = e.target;
        setProductInputs(prev => ({ ...prev, [name]: value }))
    }


    return (
        <div className='addproduct'>
            <Container>
            <form onSubmit={addProduct}>
                <input
                    placeholder="Product title"
                    name="productName"
                    onChange={handleChangee}
                    value={productInputs.productName}
                    maxLength='30'
                />
                <textarea
                    placeholder='Product decription'
                    name="productDescription"
                    onChange={handleChangee}
                    value={productInputs.productDescription}
                />
                <form id='imageForm'>
                    <input
                        placeholder="Product Images"
                        name="productImageUri"
                        onChange={handleImageChange}
                        value={input}
                        id='imageInput'
                    />
                    {imageInput.length <= 5 ? (
                        <button id='imageButton' onClick={handleImageInput}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    ) : null}
                </form>
                <input
                    type='number'
                    placeholder="Market Price"
                    name="marketPrice"
                    onChange={handleChangee}
                    value={productInputs.marketPrice}
                    min='0'
                />
                <input
                    type="number"
                    placeholder="Selling price"
                    name="sellingPrice"
                    onChange={handleChangee}
                    value={productInputs.sellingPrice}
                    min='0'
                />
                <input
                    placeholder="Product Category"
                    name="productCategory"
                    onChange={handleChangee}
                    value={productInputs.productCategory}
                />
                <input
                    placeholder="Gender"
                    name="productFor"
                    onChange={handleChangee}
                    value={productInputs.productFor}
                />
                <button type='submit'>Submit</button>
            </form>
            </Container>
        </div>
    )
}

export default addproducts;
