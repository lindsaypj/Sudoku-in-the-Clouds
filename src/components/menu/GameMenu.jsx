import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Menu from './Menu.jsx';

// Menu pages
const MenuPages = {
    Main: "main",
    GameModes: "game-modes",
    GameModeCasual: "game-mode-casual",
    Settings: "settings",
    Themes: "themes"
};

function GameMenu(props) {
    const [show, setShow] = useState(false);
    const [menuPage, setMenuPage] = useState("main");

    // Handle showing the menu on request
    useEffect(() => {
        setMenuPage(props.page);
        setShow(props.show);
    }, [props.show]);

    // Close the modal and update App state
    const handleClose = () => {
        setShow(false); // Hide modal
        props.setShow(false); // update app state
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
                <Menu
                    page={menuPage}
                    MenuPages={MenuPages}
                    setMenuPage={setMenuPage}
                    GameModes={props.GameModes}
                    setGameMode={props.setGameMode}
                    closeMenu={handleClose}
                />
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