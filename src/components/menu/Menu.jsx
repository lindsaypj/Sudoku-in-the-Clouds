import React from "react";
import Button from 'react-bootstrap/Button';

function Menu({page, handleMenuPageChange, MenuPages, GameModes, setGameMode, closeMenu}) {

    // Function to handle changing game modes
    function handleChangeGameMode(gameMode) {
        closeMenu();
        sessionStorage.setItem('gameMode', gameMode);
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
                            <Button onClick={() => {handleMenuPageChange(MenuPages.GameModes)}} >Game Modes</Button>
                        </div>
                        <div className='d-block text-center p-1'>
                            <Button onClick={() => {handleChangeGameMode(GameModes.Account)}} >Settings</Button>
                        </div>
                    </div>
                );
            case MenuPages.GameModes:
                return (
                    <div>
                        <div className="text-center">
                            <h5 className="m-0">Sudoku Casual</h5>
                            <hr className="mt-1 mx-5"></hr>
                    
                            <div className='d-inline text-center p-1'>
                                <Button onClick={() => {handleChangeGameMode(GameModes.Sudoku4x4Casual)}} >4 x 4</Button>
                            </div>
                            <div className='d-inline text-center p-1'>
                                <Button onClick={() => {handleChangeGameMode(GameModes.Sudoku9x9Casual)}} >9 x 9</Button>
                            </div>
                            <div className='d-inline text-center p-1'>
                                <Button onClick={() => {handleChangeGameMode(GameModes.Sudoku16x16Casual)}} >16 x 16</Button>
                            </div>
                        </div>
                        <div className='d-block text-center p-1'>
                            <h5 className="m-0 mt-3">Testing</h5>
                            <hr className="mt-1 mx-5"></hr>
                            <Button onClick={() => {handleChangeGameMode(GameModes.Testing)}} >Sudoku</Button>
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