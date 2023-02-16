// React Imports
import React, { useState } from 'react';

// View page Imports
import GameMenu from './components/menu/GameMenu';
import Testing from './views/Testing';
import SudokuCasual from './views/SudokuCasual';
import SudokuHome from './views/SudokuHome';
import Account from './views/Account';

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

  // Hook to manage Logged in state
  const [token, setToken] = useState();
  const [newUser, setNewUser] = useState(false);

  function renderGameMode(gameMode) {
    switch(gameMode) {
      case GameModes.Testing:
        return <Testing setMenuVisibility={setMenuVisibility}/>;
      case GameModes.Sudoku4x4Casual:
        return <SudokuCasual size={4} setMenuVisibility={setMenuVisibility} />;
      case GameModes.Sudoku9x9Casual:
        return <SudokuCasual size={9} setMenuVisibility={setMenuVisibility} />;
      case GameModes.Sudoku16x16Casual:
        return <SudokuCasual size={16} setMenuVisibility={setMenuVisibility} />;
      case GameModes.Account:
        return <Account token={token} setToken={setToken} newUser={newUser} setNewUser={setNewUser} />; 
      default:
        return <SudokuHome 
                setMenuVisibility={setMenuVisibility}
                setInitialMenuPage={setInitialMenuPage}
                GameModes={GameModes}
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
      />

      {/* Render the appropriate Gamemode/View page */}
      {renderGameMode(gameMode)}
    </div>
  );
}

export default App;
