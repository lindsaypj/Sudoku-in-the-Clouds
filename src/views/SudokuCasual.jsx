import React from "react";
import { useState, useEffect } from "react";
import SudokuBoard from "../components/boards/SudokuBoard";
import Loading from "../components/Loading.jsx";

function SudokuCasual({ gameData, setGameData, size, setMenuVisibility }) {
    // sessionStorage.clear();
    const [isLoading, setLoading] = useState(true);

    const savedBoard = getBoardsBySize(size, "save");
    const savedInitialBoard = getBoardsBySize(size, "init");

    const [board, setBoard] = useState(savedBoard);
    const [initialBoard, setInitialBoard] = useState(savedInitialBoard);

    // Function to get a random board from SudokuAPI
    // Use GET @ http://localhost:8080/sudoku/boards/random
    function fetchBoard() {
        const uri = "http://localhost:8080/sudoku/boards/"+size+"x"+size;
        const params = {
            method: "get",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }

        // Send fetch request and wait for response
        fetch(uri, params)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    console.log("ERROR: "+response.status+ " " + response.url);
                }
            })
            .then(function(newBoard) {
                // Board should be int array
                // Return array with board data to be rendered inside board
                setLoading(false);

                // Update local initboard
                setInitialBoard(newBoard);
                // Update GameData state
                setBoardsBySize(size, newBoard, "init");
                // Update session with new GameState
                sessionStorage.setItem("game-data", JSON.stringify(gameData));
            })
            // Stop loading if error occured
            .catch( (e) => setLoading(false));
    }

    // Load the data on first render
    useEffect(() => {
        // If game is stored in gameData, render
        const initState = getBoardsBySize(size, "init");
        if (initState !== undefined && initState !== null) {
            setInitialBoard(initState);

            const saveState = getBoardsBySize(size, "save");
            if (saveState !== undefined && saveState !== null) {
                setBoard(saveState);
            }
            setLoading(false);
        }
        else {
            setLoading(true);
            fetchBoard();
        }
    }, [size]);


    function getBoardsBySize(size, boardType) {
        if (boardType === "save") {
            switch(size) {
                case 4: return gameData.casual.saveStates.board4;
                case 9: return gameData.casual.saveStates.board9;
                case 16: return gameData.casual.saveStates.board16;
                default: return undefined;
            }
        }
        else if (boardType === "init"){
            switch(size) {
                case 4: return gameData.casual.initStates.board4;
                case 9: return gameData.casual.initStates.board9;
                case 16: return gameData.casual.initStates.board16;
                default: return undefined;
            }
        }
        return undefined;
    }

    function setBoardsBySize(size, board, boardType) {
        if (boardType === "save") {
            switch(size) {
                case 4: gameData.casual.saveStates.board4 = board;
                break;
                case 9: gameData.casual.saveStates.board9 = board;
                break;
                case 16: gameData.casual.saveStates.board16 = board;
                break;
                default: // do nothing
            }
        }
        else if (boardType === "init"){
            switch(size) {
                case 4: gameData.casual.initStates.board4 = board;
                break;
                case 9: gameData.casual.initStates.board9 = board;
                break;
                case 16: gameData.casual.initStates.board16 = board;
                break;
                default: // do nothing
            }
        }
    }

    function handleBoardUpdate(size, newBoard) {
        console.log(size +" : "+ newBoard );
        // Update Local state
        setBoard(newBoard);

        setBoardsBySize(size, newBoard, "save");
        console.log(gameData.casual.saveStates);
        sessionStorage.setItem("game-data", JSON.stringify(gameData));
    }


    // Display the loading component if still loading, otherwise render board
    function getRender() {
        if (isLoading === true) {
            return <Loading />
        }
        else if (isLoading === false && initialBoard !== undefined && initialBoard !== null) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center">
                            <SudokuBoard
                                size={size}
                                initialBoard={initialBoard}
                                boardIndex={size}
                                saveState={board}
                                handleBoardUpdate={handleBoardUpdate}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return <span>Error Loading data</span>
        }
    }

    // Return SudokuCasual Component
    return (
        <div>
            {getRender()}
        </div>
    );
}

export default SudokuCasual;