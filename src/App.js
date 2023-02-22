// React Imports
import React, { useState, useEffect } from 'react';

// View page Imports
import GameMenu from './components/menu/GameMenu';
import Testing from './views/Testing';
import SudokuCasual from './views/SudokuCasual';
import SudokuHome from './views/SudokuHome';
import Account from './views/Account';

// Class imports
import {GameData} from "./classes/GameData.js";

// Style imports
import './styles/css/App.css';
import './styles/css/font-roboto.css';


// Define game modes
const GameModes = {
  Sudoku4x4Casual: "casual4x4",
  Sudoku9x9Casual: "casual9x9",
  Sudoku16x16Casual: "casual16x16",
  Testing: "test",
  Account: "account"
}

function App() {
  // Hooks to manage App State
  const [gameMode, setGameMode] = useState();    // Game Mode
  const [menuVisibility, setMenuVisibility] = useState(false);    // Game Menu visibility
  const [initialMenuPage, setInitialMenuPage] = useState("main");

  // Hooks to manage Logged in state
  const [user, setUser] = useState();
  const [newUser, setNewUser] = useState(false);
  const [forcedLogin, setForcedLogin] = useState(false);

  // Hooks to manage board states
  const [gameData, setGameData] = useState();


  // LOAD DATA FROM SESSION (on load/reload)
  useEffect(() => {
    setUserFromSession();
    setGameModeFromSession();
    setGameDataFromSession();
  }, []);


  ////    SESSION ACCESS METHODS    ////

  // Function to load user data from session
  function setUserFromSession() {
    setUser(getSessionData('user', true));
  }

  // Function to load gamemode from session
  function setGameModeFromSession() {
    setGameMode(getSessionData('gameMode', false));
  }

  // Function to load board data from session
  function setGameDataFromSession() {
    const foundItem = getSessionData('game-data', true);

    if (foundItem !== undefined && foundItem !== null) {
      setGameData(foundItem);
    }
    else {
      setGameData(new GameData());
    }
  }

  // Function to load an item from session if it exists
  function getSessionData(item, parseFlag) {
    const foundItem = sessionStorage.getItem(item);

    if (foundItem !== null && foundItem !== undefined) {
      if (parseFlag) {
        return JSON.parse(foundItem);
      }
      else {
        return foundItem;
      }
    }
  }

  
  ////    RENDER SELECTED GAMEMODE    ////

  function renderGameMode(gameMode) {
    switch(gameMode) {
      case GameModes.Testing:
        return <Testing
                gameData={gameData}
                setGameData={setGameData}
                setMenuVisibility={setMenuVisibility}
              />;
      case GameModes.Sudoku4x4Casual:
        return <SudokuCasual
                gameData={gameData}
                setGameData={setGameData}
                size={4}
                setMenuVisibility={setMenuVisibility}
              />;
      case GameModes.Sudoku9x9Casual:
        return <SudokuCasual
                gameData={gameData}
                setGameData={setGameData}
                size={9}
                setMenuVisibility={setMenuVisibility}
              />;
      case GameModes.Sudoku16x16Casual:
        return <SudokuCasual
                gameData={gameData}
                setGameData={setGameData}
                size={16}
                setMenuVisibility={setMenuVisibility}
              />;
      case GameModes.Account:
        return <Account
                user={user}
                setUser={setUser}
                newUser={newUser}
                setNewUser={setNewUser}
                forcedLogin={forcedLogin}
                setForcedLogin={setForcedLogin}
                setUserFromSession={setUserFromSession}
              />; 
      default:
        return <SudokuHome 
                setMenuVisibility={setMenuVisibility}
                setInitialMenuPage={setInitialMenuPage}
                GameModes={GameModes}
                user={user}
                setUser={setUser}
                setGameMode={setGameMode}
                setNewUser={setNewUser}
              />;
    }
  }

  return (
    <div className="App bg-light">
      {/* Menu for navigating game modes + settings */}
      <GameMenu 
        page={initialMenuPage}
        setInitialMenuPage={setInitialMenuPage}
        show={menuVisibility} 
        setShow={setMenuVisibility}
        GameModes={GameModes}
        gameMode={gameMode}
        setGameMode={setGameMode} 
        user={user}
        setUser={setUser}
        setNewUser={setNewUser}
      />

      {/* Render the appropriate Gamemode/View page */}
      {renderGameMode(gameMode)}
    </div>
  );
}

export default App;
