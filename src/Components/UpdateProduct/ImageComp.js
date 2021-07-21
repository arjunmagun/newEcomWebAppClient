import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function ImageComponent({image, handleImageRemover}) {
    return (
        <div>
            <div className="image_container">
                <div className="icon_container" onClick={() => handleImageRemover(image)}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <img className="product_image" src={image} alt="productImageUri" />
            </div>
        </div>
    )
}