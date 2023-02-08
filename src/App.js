import React, { useState } from 'react';
import GameMenu from './components/GameMenu';
import Testing from './views/Testing';
import SudokuCasual from './views/SudokuCasual';
import SudokuHome from './views/SudokuHome';

import './styles/css/App.css';


// Define game modes
const GameModes = {
  Sudoku4x4Casual: "casual4x4",
  Sudoku9x9Casual: "casual9x9",
  Sudoku16x16Casual: "casual16x16",
  Testing: "test",
}

function App() {
  // Hooks to manage App State
  const [gameMode, setGameMode] = useState(GameModes.Testing);    // Game Mode
  const [menuVisibility, setMenuVisibility] = useState(false);    // Game Menu visibility

  function renderGameMode(gameMode) {
    switch(gameMode) {
      case GameModes.Testing:
        return <Testing />;
      case GameModes.Sudoku4x4Casual:
        return <SudokuCasual size={4} />;
      case GameModes.Sudoku9x9Casual:
        return <SudokuCasual size={9} />;
      case GameModes.Sudoku16x16Casual:
        return <SudokuCasual size={16} />;
      default:
        return <SudokuHome />;
    }
  }

  return (
    <div className="App bg-light">
      <GameMenu setGameMode={setGameMode} />
      {renderGameMode(gameMode)}
    </div>
  );
}

export default App;
