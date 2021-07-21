import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import './ProductCard.css';

function CatalogComp(props) {
    const history = useHistory();
    const {
        _id,
        productName,
        productImageUri,
        productFor,
        marketPrice,
        sellingPrice
    } = props;


    function handleClick(id, category) {
        history.push(`/${category}/${id}`)
    }


    return (
        <div className="productCardContainer">
            <Card key={_id} className="card" onClick={() => handleClick(_id, productFor)} >
                <Card.Img id="productImage" variant="top" src={productImageUri} />
                <Card.Body>
                    <p className="cardTitle">{productName}</p>
                    <div className="priceContainer">
                        <p className="marketPriceCard">Rs. {marketPrice}</p>
                        <p className="productPriceCard">Rs. {sellingPrice}</p>
                    </div>
                </Card.Body>
            </Card>
        </div >
    )
}

export default CatalogComp
