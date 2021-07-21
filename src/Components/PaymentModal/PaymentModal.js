import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import PaymentForm from '../PaymentForm/PaymentForm'

export default function PaymentModal(props) {

    function handleClose() {
        alert("If You close this, then your payment will not be done")
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Pay through Card
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Total Amount to be pay: Rs. {props.totalPrice}</h4>
                <PaymentForm totalPrice={props.totalPrice} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
