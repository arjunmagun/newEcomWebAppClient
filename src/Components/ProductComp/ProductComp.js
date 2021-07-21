import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import './ProductComp.css';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../../Context/CartContext';
import { ProductContext } from '../../Context/Products/products';
import BreadCrumb from './BreadCrumb';
import { firebaseAuth } from '../../Context/AuthProvider/AuthProvider';
import DeleteModal from './DeleteModal';

function ProductComp(props) {
    const { products, deleteProduct } = useContext(ProductContext);
    const [cart, setCart] = useContext(CartContext);
    const [product, setProduct] = useState(handleProduct);
    const [imageSrc, setImageSrc] = useState(handleProduct().map(el => el.productImageUri[0]));
    const history = useHistory();
    const { adminLoggedIn } = useContext(firebaseAuth);
    const [showModal, setShowModal] = useState(false);


    function handleProduct() {
        return (products.filter(product => props.match.params.id === product._id))
    }

    function handleImage(e) {
        setImageSrc(e.target.src)
    }

    const AddToCart = (item) => {
        if (!localStorage.userToken) {
            history.push('/signin')
        }
        const productAddedToCart = {
            id: item._id,
            title: item.productName,
            description: item.productDescription,
            sellingPrice: item.sellingPrice,
            marketPrice: item.marketPrice,
            imageUrl: item.productImageUri,
            quantity: 1
        }
        setCart(current => {
            const productsInCart = cart.map(items => items.id);
            if (productsInCart.includes(item._id)) {
                const updateCart = current.map(currentItems => {
                    if (currentItems.id === item.productId) {
                        return {
                            ...currentItems,
                            quantity: currentItems.quantity + 1
                        }
                    } else {
                        return currentItems
                    }
                });
                return updateCart;
            } else {
                return [...current, productAddedToCart]
            }
        })
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div className="productCompContainer">
            <Container>
                <Row>
                    {product.map(prod => (
                        <React.Fragment>
                            <DeleteModal 
                                showModal={showModal} 
                                handleShow={handleShow} 
                                handleClose={handleClose}
                                deleteProduct={deleteProduct} 
                                prod={prod} 
                                setShowModal={setShowModal}
                            />
                            <Col md={6}>
                                <BreadCrumb prod={prod} />
                                <div className="productImageContainer">
                                    <img className="productImage" src={imageSrc} alt={prod.productName} />
                                </div>
                                <div className="carouselContainer">
                                    {prod.productImageUri.map(image => (
                                        <div className="carouselImageContainer">
                                            <img onClick={e => handleImage(e)} className="productImageSmall" src={image} alt='product images' />
                                        </div>
                                    ))}
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="productDetailsContainer">
                                    <p>For: {prod.productFor.toUpperCase()}</p>
                                    <h1 className="productName">{prod.productName}</h1>
                                    <div className="productPriceContainer">
                                        <p className="productSellingPrice">Rs. {prod.marketPrice}</p>
                                        <p>Rs. {prod.sellingPrice}</p>
                                    </div>
                                    <p className="productTax">Inclusive of all taxes</p>
                                    <div className="cartBuyBtn">
                                        {adminLoggedIn ? (
                                            <>
                                            <button onClick={()=> history.push(`/${prod._id}/edit/product`)} className="editBtn">
                                                Edit product
                                            </button>
                                            <button className="deleteBtn" onClick={handleShow}>Delete Product</button>
                                            </>
                                        ) : (
                                            <>
                                            <button onClick={() => AddToCart(prod)} className="cartBtn">
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                                Add to Cart
                                            </button>
                                            <button className="buyBtn">Buy Now</button>
                                        </>
                                        )}
                                    </div>
                                    <h3>Description: </h3>
                                    <p>{prod.productDescription}</p>
                                </div>
                            </Col>
                        </React.Fragment>
                    ))}
                </Row>
            </Container>
        </div >
    )
}

export default ProductComp
