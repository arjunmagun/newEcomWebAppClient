import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function AppModal() {
    const [appModal, setAppModal] = useState(true);
    const handleClose = () => setAppModal(false);
    useEffect(()=>{
      let pop_status = localStorage.getItem('pop_status');
      if(pop_status === "1") setAppModal(false);
      else localStorage.setItem('pop_status', 1);
    },[]);

    if(!appModal) return null;

    return (
        <Modal show={appModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to my project.</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is a demo MERN Stack personal project deployed on free providers.</Modal.Body>
        <Modal.Body>Please consider that some actions might take few seconds so please refresh the app after any action.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close and Explore
          </Button>
        </Modal.Footer>
      </Modal>
    )
}