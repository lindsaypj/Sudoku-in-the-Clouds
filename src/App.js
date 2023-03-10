// React Imports
import React, { useState, useLayoutEffect, useEffect, useCallback } from 'react';

// Style imports
import './styles/css/theme.css';
import './styles/css/App.css';
import './styles/css/font-roboto.css';

// View page Imports
import Testing from './views/Testing';
import SudokuCasual from './views/SudokuCasual';
import SudokuHome from './views/SudokuHome';
import Account from './views/Account';

// Component Imports
import GameMenu from './components/menu/GameMenu';
import Notification from './components/Notification';

// Class imports
import { GameData } from "./classes/GameData";
import { GameColor } from './classes/GameColor';


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
  const [globalNotification, setGlobalNotification] = useState("");
  const [isGlobalError, setIsGlobalError] = useState(false);

  // Hooks to manage Logged in state
  const [user, setUser] = useState();
  const [newUser, setNewUser] = useState(false);
  const [forcedLogin, setForcedLogin] = useState(false);
  const [returnAfterLogin, setReturnAfterLogin] = useState();

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
                user={user}
                setUser={setUser}
                forcedLogin={forcedLogin}
                setForcedLogin={setForcedLogin}
                setReturnAfterLogin={setReturnAfterLogin}
                newUser={newUser}
                setNewUser={setNewUser}
                gameData={gameData}
                setGameData={setGameData}
                size={4}
                GameModes={GameModes}
                gameMode={gameMode}
                setGameMode={setGameMode}
                setGlobalNotification={setGlobalNotification}
                setIsGlobalError={setIsGlobalError}
              />;
      case GameModes.Sudoku9x9Casual:
        return <SudokuCasual
                user={user}
                setUser={setUser}
                forcedLogin={forcedLogin}
                setForcedLogin={setForcedLogin}
                setReturnAfterLogin={setReturnAfterLogin}
                newUser={newUser}
                setNewUser={setNewUser}
                gameData={gameData}
                setGameData={setGameData}
                size={9}
                GameModes={GameModes}
                gameMode={gameMode}
                setGameMode={setGameMode}
                setGlobalNotification={setGlobalNotification}
                setIsGlobalError={setIsGlobalError}
              />;
      case GameModes.Sudoku16x16Casual:
        return <SudokuCasual
                user={user}
                setUser={setUser}
                forcedLogin={forcedLogin}
                setForcedLogin={setForcedLogin}
                setReturnAfterLogin={setReturnAfterLogin}
                newUser={newUser}
                setNewUser={setNewUser}
                gameData={gameData}
                setGameData={setGameData}
                size={16}
                GameModes={GameModes}
                gameMode={gameMode}
                setGameMode={setGameMode}
                setGlobalNotification={setGlobalNotification}
                setIsGlobalError={setIsGlobalError}
              />;
      case GameModes.Account:
        return <Account
                user={user}
                setUser={setUser}
                setGameMode={setGameMode}
                returnAfterLogin={returnAfterLogin}
                setReturnAfterLogin={setReturnAfterLogin}
                newUser={newUser}
                setNewUser={setNewUser}
                forcedLogin={forcedLogin}
                setForcedLogin={setForcedLogin}
                setUserFromSession={setUserFromSession}
                setGlobalNotification={setGlobalNotification}
                setIsGlobalError={setIsGlobalError}
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

  ////    RENDER USER PREFERENCES    ////

  useLayoutEffect(() => renderPreferences(),[user]);

  const renderPreferences = useCallback(() => {
    // Define default Styles
    let pageBGColor = "rgb(248,249,250)";
    let cellBGColor = "rgb(255,255,255)";
    let infoTextColor = "rgb(0,0,0)";
    let cellTextColor = "rgb(0,0,0)";
    let boardBorderColor = "rgb(0,0,0)";
    
    // Redefine styles based on user preferences
    if (user !== undefined && user !== null) {
      pageBGColor = new GameColor(user.preferences.pageBackgroundColor).toHex();
      cellBGColor = new GameColor(user.preferences.cellBackgroundColor).toHex();
      infoTextColor = new GameColor(user.preferences.infoTextColor).toHex();
      cellTextColor = new GameColor(user.preferences.cellTextColor).toHex();
      boardBorderColor = new GameColor(user.preferences.boardBorderColor).toHex();
    }

    // Implement styling
  
    // Getting the stylesheet
    const stylesheet = document.styleSheets[0];
    console.log(stylesheet);
    
    if (stylesheet) {
      // Background Color (RULE 0)
      stylesheet.cssRules[0].style.setProperty('background-color', pageBGColor, "important");
      // Info Text Color (RULE 1)
      stylesheet.cssRules[1].style.setProperty('color', infoTextColor, "important");
      // Cell Background Color (RULE 2)
      stylesheet.cssRules[2].style.setProperty('background-color', cellBGColor, "important");
      // Cell Text Color (RULE 3)
      stylesheet.cssRules[3].style.setProperty('color', cellTextColor, "important");
      // Board Border Color (RULE 4)
      stylesheet.cssRules[4].style.setProperty('border-color', boardBorderColor, "important");
    }
    
  }, [user]);

  return (
    <div className="App">
      {/* Menu for navigating game modes + settings */}
      <GameMenu 
        page={initialMenuPage}
        setInitialMenuPage={setInitialMenuPage}
        show={menuVisibility} 
        setShow={setMenuVisibility}
        GameModes={GameModes}
        gameMode={gameMode}
        setGameMode={setGameMode}
        setGameData={setGameData}
        user={user}
        setUser={setUser}
        setNewUser={setNewUser}
      />

      {/* Render the appropriate Gamemode/View page */}
      {renderGameMode(gameMode)}
      <Notification message={globalNotification} isError={isGlobalError} />
    </div>
  );
}

export default App;
