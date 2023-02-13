import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Menu pages
const MenuPages = {
    Main: "main",
    GameModes: "game-modes",
    Settings: "settings",
    Themes: "themes"
};

function GameMenu(props) {
    const [show, setShow] = useState(false);
    const [menuPage, setMenuPage] = useState("main");

    // Handle showing the menu on request
    useEffect(() => {
        setMenuPage("main");
        setShow(props.show);
    }, [props.show]);

    // Close the modal and update App state
    const handleClose = () => {
        setShow(false); // Hide modal
        setMenuPage("main"); // Return the menu to main
        props.setShow(false); // update app state
    }

    // Render the selected menu page
    function renderMenuPage(page) {
        switch (page) {
            case "main":
                return 
        }
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

const 

export default GameMenu;