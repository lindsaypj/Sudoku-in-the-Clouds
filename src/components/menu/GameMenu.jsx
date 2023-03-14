import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Menu from './Menu.jsx';

import { GameData } from "../../classes/GameData.js";
import LoginLogoutBtn from '../buttons/LoginLogoutBtn.jsx';

// Menu pages
const MenuPages = {
    Main: "main",
    GameModes: "game-modes"
};

function GameMenu(props) {
    const [show, setShow] = useState(false);
    const [menuPage, setMenuPage] = useState("main");
    const [menuTitle, setMenuTitle] = useState("SUDOKU MENU");

    // Handle showing the menu on request
    useLayoutEffect(() => {
        handleMenuPageChange(props.page);
        setShow(props.show);
    }, [props, props.show]);

    // Close the menu and update App state
    const handleClose = () => {
        setShow(false); // Hide modal
        props.setShow(false); // update app state
    }

    const handleBack = () => {
        setMenuPage(MenuPages.Main);
        setMenuTitle(getTitleByPage(MenuPages.Main))
    }

    // Function to handle updating the menu page and components
    function handleMenuPageChange(page) {
        setMenuPage(page);
        setMenuTitle(getTitleByPage(page));
    }


    ////    RENDERING FUNCTIONS    ////

    // Function to update the title using the given page as reference
    function getTitleByPage(page) {
        switch(page) {
            case MenuPages.Main:
                return "SUDOKU MENU";
            case MenuPages.GameModes:
                return "Select a Game Mode";
            default:
                return "SUDOKU MENU";
        }
    }    

    // Function to render the navbar when not on home page
    function getNavbar() {
        if (props.gameMode) {
            return (
                <div className='d-block p-2 px-4 sticky-top z-top shadow-sm theme-background'>
                    <button 
                        className="btn btn-secondary mx-3 shadow-sm"
                        onClick={() => {
                            props.setShow(true);
                            props.setInitialMenuPage(MenuPages.Main);
                        }}
                    >Menu</button>
                    <LoginLogoutBtn
                        className={"btn btn-secondary mx-3 shadow-sm float-end"}
                        user={props.user}
                        setUser={props.setUser}
                        GameModes={props.GameModes}
                        setGameMode={props.setGameMode}
                        setNewUser={props.setNewUser}
                    />
                </div>
            );
        }
    }

    // Function to render the footer (add back button if not on main)
    function getFooterContent() {
        if (menuPage !== MenuPages.Main) {
           return (
                <>
                <button className='btn btn-secondary shadow-sm' onClick={handleBack}>
                    Back
                </button>
                <button className='btn btn-secondary shadow-sm' onClick={handleClose}>
                    Close
                </button>
                </>
            ); 
        }
        else {
            return (
                <Button className='btn btn-secondary shadow-sm' onClick={handleClose}>
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
            <Modal.Header className={'theme-background'}>
                <Modal.Title className='mx-auto'>{menuTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Menu
                    page={menuPage}
                    MenuPages={MenuPages}
                    handleMenuPageChange={handleMenuPageChange}
                    GameModes={props.GameModes}
                    setGameMode={props.setGameMode}
                    closeMenu={handleClose}
                    className={'theme-background'}
                />
            </Modal.Body>
            <Modal.Footer className='justify-content-center theme-background'>
                {getFooterContent()}
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default GameMenu;