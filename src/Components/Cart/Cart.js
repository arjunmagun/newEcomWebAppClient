import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { CartContext } from '../../Context/CartContext';
import PaymentModal from '../PaymentModal/PaymentModal';
import "./Cart.css";

export default function Cart(props) {
    const [cart, setCart] = useContext(CartContext);
    const history = useHistory();
    const [warning, setWarning] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modeOfPayment, setModeOfPayment] = useState('');
    const totalPrice = cart.reduce((acc, curr) => acc + curr.sellingPrice * curr.quantity, 0);
    const marketPrice = cart.reduce((acc, curr) => acc + curr.marketPrice * curr.quantity, 0);
    const amountSaved = marketPrice - totalPrice;

    function handleModeOfPayment(e) {
        if (e.target.value === "Select") {
            return;
        } else {
            setModeOfPayment(e.target.value)
        }
    }

    function handleCheckout() {
        if (localStorage.getItem('userToken')) {

            if (modeOfPayment === "") {
                setWarning(true)
            } else {
                setWarning(false)
                if (modeOfPayment === "debitCreditCard") {
                    setShowModal(true)
                }
            }
        } else {
            props.history.push('/signin')
        }
    }

    function handlePlusQuantity(product) {
        let prodToChange = cart.filter(el => el.id === product.id)
        prodToChange.map(prod => {
            prod.quantity = prod.quantity + 1
        })
        setCart([
            ...cart
        ], prodToChange)
    }

    function handleMinusQuantity(product) {
        let prodToChange = cart.filter(el => el.id === product.id)
        prodToChange.map(prod => {
            if (prod.quantity === 1) {
                return;
            } else {
                prod.quantity = prod.quantity - 1
            }
        })
        setCart([
            ...cart
        ], prodToChange)
    }

    function removeProduct(product) {
        const filteredCart = cart.filter(el => el.id !== product.id)
        setCart(filteredCart)
    }

    return (
        <div className="cartContainer">
            <Container>
                <h1 className='cartTitle'>Shopping cart</h1>
                <Row>
                    <Col lg={8}>
                        {cart.map(products => (
                            <>
                                <div className="cartItem">
                                    <div className='cartImg'>
                                        <img src={products.imageUrl} alt='cartImg' />
                                    </div>
                                    <div className='cartDetails'>
                                        <p>{products.title}</p>
                                    </div>
                                    <div className="quantityController">
                                        <button onClick={() => handlePlusQuantity(products)}>+</button>
                                        <p>Quantity: {products.quantity}</p>
                                        <button onClick={() => handleMinusQuantity(products)}>-</button>
                                    </div>
                                    <div className='amountContainer'>
                                        <p className='marketPrice'>Rs. {products.marketPrice}</p>
                                        <p>Rs. {products.sellingPrice}</p>
                                    </div>
                                    <div className='deleteItem' onClick={() => removeProduct(products)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </div>
                                </div>
                            </>
                        ))}
                    </Col>
                    <Col lg={4}>
                        {JSON.parse(localStorage.getItem("userToken")).cart.length > 0 ? (
                            <div className='paymentContainer'>
                            <p className='shipping'>Total MRP: Rs. {marketPrice}</p>
                            <p className='savedAmount'>Amount saved: <span>Rs. {amountSaved}</span></p>
                            <p className='totalAmount'>Total Amount: Rs. {totalPrice}</p>
                            <div className='optionSelector'>
                                {warning ? <p>SELECT A PAYMENT METHOD!</p> : null}
                                <label className='optionLabel' for="cars">Choose Payment option:</label>

                                <select onInput={handleModeOfPayment} className='selector' name="cars" id="cars">
                                    <option value="Select">Select mode of payment</option>
                                    <option value="COD">
                                        COD
                                    </option>
                                    <option value="debitCreditCard">Debit / Credit Card</option>
                                </select>
                            </div>
                            <div className="buttonContainer">
                                <button className="continueBtn" onClick={() => history.goBack()}>Continue Shopping</button>
                                <button className="checkoutBtn" onClick={handleCheckout} >Checkout Now</button>
                            </div>
                        </div>
                        ) : null}
                    </Col>
                </Row>
            </Container>
            <PaymentModal show={showModal} onHide={() => setShowModal(false)} totalPrice={totalPrice} />
        </div >
    )
}
