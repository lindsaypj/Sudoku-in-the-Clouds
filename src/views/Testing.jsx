import React from "react";
import { useState } from "react";
import SudokuBoard from "../components/boards/SudokuBoard";
import TestConfigurator from "../components/TestConfigurator";

import ".././styles/css/testing.css";

/**
 * The Testing view is designed for testing funcitonality across board sizes,
 * configuring patterns across
 * @returns Testing view component  
 */
function Testing({ gameData, setGameData, setMenuVisibility }) {
    let initialNumBoards;
    let initialBoardSize;
    let initialHideNums;
    let initialBoards;

    if (gameData.testing.numBoards !== undefined && gameData.testing.numBoards !== null) {
        initialNumBoards = gameData.testing.numBoards;
    }
    else {
        initialNumBoards = 1;
    }
    if (gameData.testing.boardSize !== undefined && gameData.testing.boardSize !== null) {
        initialBoardSize = gameData.testing.boardSize;
    }
    else {
        initialBoardSize = 9;
    }
    if (gameData.testing.hideNums !== undefined && gameData.testing.hideNums !== null) {
        initialHideNums = gameData.testing.hideNums;
    }
    else {
        initialHideNums = false;
    }
    if (getBoardsBySize(initialBoardSize) !== undefined && 
        getBoardsBySize(initialBoardSize) !== null) 
    {
        initialBoards = getBoardsBySize(initialBoardSize);
    }
    else {
        initialBoards = new Array(initialNumBoards).fill(new Array(initialBoardSize*initialBoardSize).fill(0));
    }
    const [numBoards, setNumBoards] = useState(initialNumBoards);
    const [boardSize, setBoardSize] = useState(initialBoardSize);
    const [hideNums, setHideNums] = useState(initialHideNums);
    const [boards, setBoards] = useState(initialBoards);
    
    function handleSizeChange(size) {
        if (size === 4 || size === 9 || size === 16) {
            setBoardSize(size);
            gameData.testing.boardSize = size;

            let newBoards = getBoardsBySize(size);
            if (newBoards === undefined || newBoards === null) {
                newBoards = new Array(numBoards).fill(new Array(size*size).fill(0));
                setBoardsBySize(size, newBoards);
            }
            setBoards(newBoards);

            // Adapt stored boards to current count
            if (newBoards.length !== numBoards) {
                handleNumBoardsChange(numBoards, newBoards);
            }
            sessionStorage.setItem("game-data", JSON.stringify(gameData));
        }
    }

    function getBoardsBySize(size) {
        switch(size) {
            case 4: return gameData.testing.boards.board4;
            case 9: return gameData.testing.boards.board9;
            case 16: return gameData.testing.boards.board16;
            default: return undefined;
        }
    }

    function setBoardsBySize(size, boards) {
        switch(size) {
            case 4: gameData.testing.boards.board4 = boards;
            break;
            case 9: gameData.testing.boards.board9 = boards;
            break;
            case 16: gameData.testing.boards.board16 = boards;
            break;
            default: // do nothing
        }
    }

    function handleNumBoardsChange(count, handleBoards = boards) {
        if (count > 0 && count < 100) {  
            
            // Update boards
            if (handleBoards.length > count) {
                handleBoards.splice(count, Infinity);
            }
            else if (handleBoards.length < count) {
                for (let diff = (count - handleBoards.length); diff > 0; diff--) {
                    handleBoards.push(new Array(boardSize*boardSize).fill(0));
                }
            }
            setBoardsBySize(boardSize, handleBoards);

            // Update count
            setNumBoards(count);
            gameData.testing.numBoards = count;
            sessionStorage.setItem("game-data", JSON.stringify(gameData));
        }
    }

    function handleHideNumsChange(hideNumsFlag) {
        if (hideNumsFlag === true || hideNumsFlag === false) {
            setHideNums(hideNumsFlag);
            gameData.testing.hideNums = hideNumsFlag;
            sessionStorage.setItem("game-data", JSON.stringify(gameData));
        }
    }

    function handleBoardUpdate(boardIndex, newBoard) {
        // Update local state
        const updatedBoards = boards.map((current, index) => {
            if (boardIndex === index) {
              // Set the updated board
              return newBoard;
            } else {
              // The rest haven't changed
              return current;
            }
          });
        setBoards(updatedBoards);

        // Update GameData with new data
        setBoardsBySize(boardSize, updatedBoards);

        // Store new GameData in session
        sessionStorage.setItem("game-data", JSON.stringify(gameData));
    }


    ////    DATA RENDERING LOGIC    ////
    
    // Load game data if given
    if (gameData?.testing === undefined || gameData?.testing === null) {
        // Store current settings in session
        gameData.testing.numBoards = numBoards;
        gameData.testing.boardSize = boardSize;
        gameData.testing.hideNums = hideNums;
        setBoardsBySize(boardSize, boards);

        sessionStorage.setItem("game-data", JSON.stringify(gameData));
    }
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-12">
                    {/* Configurator for adjusting board parameters */}
                    <TestConfigurator
                        setNumBoards={handleNumBoardsChange}
                        numBoards={numBoards}
                        setBoardSize={handleSizeChange}
                        boardSize={boardSize}
                        setHideNums={handleHideNumsChange}
                        hideNums={hideNums}
                        setMenuVisibility={setMenuVisibility}
                    />
                </div>
                <div className="col-12 col-md-8 col-lg-9 col-xl-10 text-center">
                    {/* Render Configured Boards */}
                    <div className="testing-container">
                        {boards.map((value, index) => (
                            <div key={index} className="board-container">
                                <SudokuBoard
                                    size={boardSize}
                                    initialBoard={null}
                                    hideNums={hideNums}
                                    boardIndex={index}
                                    saveState={boards[index]}
                                    handleBoardUpdate={handleBoardUpdate}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
  }

  export default Testing;