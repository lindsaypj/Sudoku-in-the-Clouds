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
    const handleClose = () => {
        setShow(false);
        props.setShow(false);
    }

    return (
        <>
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
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default GameMenu;