import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function GameMenu(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
        {/* Menu button */}
        <Button variant="primary" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-grid-3x3" viewBox="0 0 16 16">
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5V5h4V1H1.5zM5 6H1v4h4V6zm1 4h4V6H6v4zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5v-4zm1 0v4h4v-4H6zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11h-4zm0-1h4V6h-4v4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11v4zm-1 0V1H6v4h4z"/>
            </svg>
        </Button>

        {/* Game Menu Modal */}
        <Modal 
            show={show} 
            onHide={handleClose}
            centered
        >
            <Modal.Header>
            <Modal.Title className='mx-auto'>SUDOKU MENU</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-block text-center p-1'>
                   <Button >Game Modes</Button> 
                </div>
                <div className='d-block text-center p-1'>
                    <Button >Settings</Button>
                </div>
                <div className='d-block text-center p-1'>
                    <Button >Theme</Button>
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default GameMenu;