import React from "react";

import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirmation({ show, setShow, handleDelete }) {
    const handleClose = () => setShow(false);
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="justify-content-center">
                <Modal.Title>WARNING</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p className="m-0">Are you sure you want to delete your account?</p>
                <p>Your information will be permanently deleted.</p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}