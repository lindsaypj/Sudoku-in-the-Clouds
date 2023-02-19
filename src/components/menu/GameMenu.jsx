import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Menu from './Menu.jsx';

// Menu pages
const MenuPages = {
    Main: "main",
    GameModes: "game-modes",
    GameModeCasual: "game-mode-casual"
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

    const handleBack = () => {
        setMenuPage(MenuPages.Main);
    }

    function getLoginLogout() {
        if (props.user !== null && props.user !== undefined) {
            return (
                <button 
                    className="btn bg-secondary mx-3 text-white shadow-sm float-end"
                    onClick={() => {
                        sessionStorage.clear();
                        props.setUser(null);
                        sessionStorage.setItem('gameMode', "");
                        props.setGameMode("");
                    }}
                >Logout</button>
            );
        }
        else {
            return (
                <button 
                    className="btn bg-secondary mx-3 text-white shadow-sm float-end"
                    onClick={() => {
                        props.setNewUser(false);
                        sessionStorage.setItem('gameMode', "account");
                        props.setGameMode("account");
                    }}
                >Login</button>
            );
        }
    }

    // Function to render the navbar when not on home page
    function getNavbar() {
        if (props.gameMode) {
            return (
                <div className='d-block p-2 px-4 sticky-top bg-white z-top shadow-sm'>
                    <button 
                        className="btn bg-secondary mx-3 text-white shadow-sm"
                        onClick={() => {
                            props.setShow(true);
                            props.setInitialMenuPage(MenuPages.Main);
                        }}
                    >Menu</button>
                    {getLoginLogout()}
                </div>
            );
        }
    }

    // Function to render the footer (add back button if not on main)
    function getFooter() {
        if (menuPage !== MenuPages.Main) {
           return (
                <>
                <Button variant="secondary" onClick={handleBack}>
                    Back
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </>
            ); 
        }
        else {
            return (
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            );
        }
        
        
    }

    return (
        <>
        {/* Only render navbar when not on homepage */}
        {getNavbar()}

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
                {getFooter()}
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default GameMenu;