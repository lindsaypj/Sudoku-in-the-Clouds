import React from "react";
import { useState, useEffect } from "react";
import SudokuBoard from "../components/boards/SudokuBoard";
import Loading from "../components/Loading.jsx";

const FETCH_FAILURE_MSG = "Failed to fetch";

function SudokuCasual({ user, setUser, forcedLogin, setForcedLogin, setReturnAfterLogin, newUser,
     setNewUser, gameData, setGameData, size, GameModes, gameMode, setGameMode, setGlobalNotification, setIsGlobalError }) {

    ////    INITIALIZATION    ////

    // Get data from GameData
    const savedBoard = getBoardsBySize(size, "save");
    const savedInitialBoard = getBoardsBySize(size, "init");
    const savedUpdateWins = gameData.casual.updateWinPostLogin;
    const savedIsComplete = gameData.casual.isComplete;

    // Hooks to manage Game State
    const [board, setBoard] = useState(savedBoard);
    const [initialBoard, setInitialBoard] = useState(savedInitialBoard);
    const [updateWinPostLogin, setUpdateWinPostLogin] = useState(savedUpdateWins);

    // Hooks to manage Displayable game state information
    const [isLoading, setLoading] = useState(true);
    const [isComplete, setComplete] = useState(savedIsComplete);
    const [errorMessage, setErrorMessage] = useState("");
    const [saveUserWin, setSaveUserWin] = useState(false);

    // Load the data on first render and on size change
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

    // Attept to Update user after login/create account
    useEffect(() => {
        if (forcedLogin === false && newUser === false && gameData.casual.updateWinPostLogin === true) {
            // Only update if user last gen was > 5 seconds ago
            if ((Date.now() - user.lastGen) < 5000) {
                setUpdateWinPostLogin(false);
                gameData.casual.updateWinPostLogin = false;
                sessionStorage.setItem("game-data", JSON.stringify(gameData));
                handleWin();
            }
        }
    }, [gameMode]);


    ////    FETCH API REQUESTS    ////

    // Function to get a random board from SudokuAPI
    // Use GET @ http://localhost:8080/sudoku/boards/{size}
    function fetchBoard() {
        const uri = "http://localhost:8080/sudoku/boards/"+size+"x"+size;
        const params = {
            method: "get",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }

        // GET request for random solvable board
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
                // Update local boards
                setInitialBoard(newBoard);
                setBoard(newBoard);
                // Update GameData state
                setBoardsBySize(size, newBoard, "init");
                setBoardsBySize(size, newBoard, "save");
                // Update session with new GameState
                sessionStorage.setItem("game-data", JSON.stringify(gameData));
            })
            // Stop loading if error occured
            .catch( (e) => setLoading(false));
    }

    // Function to post a solved board to the sudokuAPI
    // Use POST @ http://localhost:8080/sudoku/boards/{size}/solved
    function postSolvedBoard(newBoardSize, newBoard) {
        const uri = "http://localhost:8080/sudoku/boards/"+newBoardSize+"x"+newBoardSize+"/solved";
        const params = {
            method: "post",
            mode: "cors",
            body: JSON.stringify(newBoard),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(uri, params)
            .then(function(response) {
                setErrorMessage("");

                // Handle Response
                if (response.ok) { // CREATED
                    handleWin();

                    // Clear old data
                    setBoardsBySize(newBoardSize, null, "init");
                    setBoardsBySize(newBoardSize, null, "save");

                    // Request new GameData
                    setLoading(true);
                    fetchBoard();
                }
                else if (response.status === 400) { // BAD REQUEST
                    return response.json();
                }
            })
            .then(function(conflicts) {
                if (conflicts) {
                    console.log("Invalid Board Conflicts: "+conflicts);
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    // Network error
                    if (error.message === FETCH_FAILURE_MSG) {
                        setGlobalNotification("Network Error");
                        setIsGlobalError(true);
                    }
                }
            })
    }

    // Function to update user wins
    // Use PUT @ http://localhost:8080/sudoku/users/{usename}
    function updateUserWins() {
        // Update user object with new won game
        switch(size) {
            case 4: 
                user.gamesWon.wins4x4 = user.gamesWon.wins4x4 + 1;
                user.totalGamesWon = user.totalGamesWon + 1;
                break;
            case 9: 
                user.gamesWon.wins9x9 = user.gamesWon.wins9x9 + 1;
                user.totalGamesWon = user.totalGamesWon + 1;
                break;
            case 16: 
                user.gamesWon.wins16x16 = user.gamesWon.wins16x16 + 1;
                user.totalGamesWon = user.totalGamesWon + 1;
                break;
            default:
                // Invalid size
                return;
        }

        const updateURI = "http://localhost:8080/sudoku/users/"+user.username;
        const params = {
            method: "put",
            mode: "cors",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        };

        // Make Fetch PUT request
        fetch(updateURI, params)
            .then(function(response) {
                if (response.ok) {
                    // User successfully updated
                    return response.json();
                }
                else if (response.status === 404) {
                    // User not found
                    setGlobalNotification("User account not found");
                    setIsGlobalError(true);
                }
                else if (response.status === 400) {
                    // Invalid User data or token. Request user login and retry
                    setUpdateWinPostLogin(true);
                    gameData.casual.updateWinPostLogin = true;
                    sessionStorage.setItem("game-data", JSON.stringify(gameData));

                    setUser();
                    setForcedLogin(true);
                    setReturnPage(size);
                    setGlobalNotification("Timed out. Please log in");
                    setIsGlobalError(true);
                    setGameMode(GameModes.Account);
                }
            })
            .then(function(updatedUser) {
                // Update Account state with User data from response
                if (updatedUser !== null && updatedUser !== undefined) {
                    // Save updated user
                    setUser(updatedUser);
                    sessionStorage.setItem('user', JSON.stringify(updatedUser));
                    setSaveUserWin(false);

                    // confirm update occured
                    setUpdateWinPostLogin(false);
                    gameData.casual.updateWinPostLogin = false;
                    sessionStorage.setItem("game-data", JSON.stringify(gameData));

                    // Render Notification
                    setGlobalNotification("User wins updated! Total: "+updatedUser.totalGamesWon);
                    setIsGlobalError(false);
                }
            })
            .catch((response) => {
                if (response instanceof TypeError) {
                    setGlobalNotification("Network Error: failed to connect to server");
                    setIsGlobalError(true);
                }
            });
    }

    // Function to handle Game completion
    
    function handleWin() {
        setComplete(true);
        gameData.casual.savedIsComplete = true;
        sessionStorage.setItem("game-data", JSON.stringify(gameData));

        // If user is logged in, Update user wins
        if (user !== undefined && user !== null) {
            // Attempt to update user
            updateUserWins();
        }
        // Prompt user to login to save their win
        else {
            // Set global error message
            setSaveUserWin(true);
        }
    }

    function setReturnPage(boardSize) {
        switch (boardSize) {
            case 4: 
                setReturnAfterLogin(GameModes.Sudoku4x4Casual);
                break;
            case 9: 
                setReturnAfterLogin(GameModes.Sudoku9x9Casual);
                break;
            case 16: 
                setReturnAfterLogin(GameModes.Sudoku16x16Casual)
                break;
            default:
                // Invalid size
                return; 
        }
    }


    ////    GAMEDATA MANAGMENT    ////

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

    // Function to handle a board update (change cell value)
    function handleBoardUpdate(size, newBoard) {
        // Update Local state
        setBoard(newBoard);
        // Update GameData
        setBoardsBySize(size, newBoard, "save");
        // Update Session
        sessionStorage.setItem("game-data", JSON.stringify(gameData));

        // Check for win
        if (newBoard.length === size*size && !newBoard.includes(0)) {
            postSolvedBoard(size, newBoard);
        }
    }


    ////    RENDERING    ////

    // Display the loading component if still loading, otherwise render board
    function getRender() {
        if (isComplete === true) {
            // If user is not logged in
            if (saveUserWin === true) {
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 text-center p-3">
                                <h1>Board Complete!</h1>

                                <p>Would you like to create an account to save your win?</p>
                                <button 
                                    onClick={() => {
                                        setUpdateWinPostLogin(true);
                                        gameData.casual.updateWinPostLogin = true;
                                        sessionStorage.setItem("game-data", JSON.stringify(gameData));

                                        setReturnPage(size);
                                        setForcedLogin(true);
                                        setGameMode(GameModes.Account);
                                    }}
                                >Login</button>
                                <button
                                    onClick={() => {
                                        setUpdateWinPostLogin(true);
                                        gameData.casual.updateWinPostLogin = true;
                                        sessionStorage.setItem("game-data", JSON.stringify(gameData));

                                        setReturnPage(size);
                                        setNewUser(true);
                                        setGameMode(GameModes.Account);
                                    }}
                                >Create Account</button>

                                <button
                                    onClick={() => {
                                        setComplete(false);
                                        gameData.casual.savedIsComplete = false;
                                        sessionStorage.setItem("game-data", JSON.stringify(gameData));
                                    }}
                                >New Game</button>
                                <button
                                    onClick={() => {
                                        setComplete(false);
                                        gameData.casual.savedIsComplete = false;
                                        sessionStorage.setItem("game-data", JSON.stringify(gameData));
                                        setGameMode("");
                                    }}
                                >Home</button>
                            </div>
                        </div>
                    </div>
                );
            }
            // User is logged in and updated
            else {
                return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center p-3">
                            <h1>Board Complete!</h1>
        
                            <button
                                onClick={() => {
                                    setComplete(false);
                                    gameData.casual.savedIsComplete = false;
                                    sessionStorage.setItem("game-data", JSON.stringify(gameData));
                                }}
                            >New Game</button>
                            <button
                                onClick={() => {
                                    setComplete(false);
                                    gameData.casual.savedIsComplete = false;
                                    sessionStorage.setItem("game-data", JSON.stringify(gameData));
                                    setGameMode("");
                                }}
                            >Home</button>
                        </div>
                    </div>
                </div>
                );
            }
        }
        else if (isLoading === true) {
            return <Loading />
        }
        else if (isLoading === false && initialBoard !== undefined && initialBoard !== null) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center p-3">
                            <SudokuBoard
                                size={size}
                                initialBoard={initialBoard}
                                boardIndex={size}
                                saveState={board}
                                handleBoardUpdate={handleBoardUpdate}
                            />
                            <span className="d-block text-danger">{errorMessage}</span>
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