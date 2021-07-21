import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function DeleteModal({showModal, handleClose, deleteProduct, prod, setShowModal}) {
    return (
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete the product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Body>This might take some time, so please refresh the app to see changes.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteProduct(prod._id, setShowModal)}>
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>
    )
}