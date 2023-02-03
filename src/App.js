import React, { useState } from 'react';
import GameMenu from './components/GameMenu';
import Testing from './views/Testing';

import './styles/css/App.css';

// Define game modes
const GameModes = {
  Sudoku4x4Casual: "casual4x4",
  Sudoku9x9Casual: "casual9x9",
  Sudoku16x16Casual: "casual16x16",
  Testing: "test",
}

function App() {
  // Hooks to manage Game State
  const [gameMode, setGameMode] = useState(GameModes.Testing);

  return (
    <div className="App bg-light">
      <GameMenu setGameMode={setGameMode} />
      <Testing />
    </div>
  );
}

export default App;
