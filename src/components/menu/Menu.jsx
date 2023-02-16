import React from "react";
import Button from 'react-bootstrap/Button';

function Menu({page, setMenuPage, MenuPages, GameModes, setGameMode, closeMenu}) {

    // Function to handle changing game modes
    function handleChangeGameMode(gameMode) {
        closeMenu();
        setGameMode(gameMode);
    }

    function getContent() {
        switch (page) {
            case MenuPages.Main:
                return (
                    <div>
                        <div className='d-block text-center p-1'>
                            <Button onClick={() => {handleChangeGameMode("")}} >Home</Button>
                        </div>
                        <div className='d-block text-center p-1'>
                            <Button onClick={() => {setMenuPage("game-modes")}} >Game Modes</Button>
                        </div>
                        <div className='d-block text-center p-1'>
                            <Button onClick={() => {handleChangeGameMode("account")}} >Settings</Button>
                        </div>
                    </div>
                );
            case MenuPages.GameModes:
                return (
                    <div>
                        <div className='d-block text-center p-1'>
                            <Button onClick={() => {setMenuPage("game-mode-casual")}} >Casual</Button>
                        </div>
                        <div className='d-block text-center p-1'>
                            <Button onClick={() => {handleChangeGameMode(GameModes.Testing)}} >Testing</Button>
                        </div>
                    </div>
                );
            case MenuPages.GameModeCasual:
                return (
                    <div>
                        <div className='d-block text-center p-1'>
                            <Button onClick={() => {handleChangeGameMode(GameModes.Sudoku4x4Casual)}} >4 x 4</Button>
                        </div>
                        <div className='d-block text-center p-1'>
                            <Button onClick={() => {handleChangeGameMode(GameModes.Sudoku9x9Casual)}} >9 x 9</Button>
                        </div>
                        <div className='d-block text-center p-1'>
                            <Button onClick={() => {handleChangeGameMode(GameModes.Sudoku16x16Casual)}} >16 x 16</Button>
                        </div>
                    </div>
                );
            default: 
                return (<div><span>Page Not Found: {String(page)}</span></div>);
        }
    }

    return (
        <>{getContent()}</>
    );
}

export default Menu;