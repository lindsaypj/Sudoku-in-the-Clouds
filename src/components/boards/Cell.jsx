import React, { useReducer, useState } from 'react';
import { useEffect } from 'react';

import '../.././styles/css/cell.css'

// Static Constants
const COLORS = ["black", "blue", "red", "green", "yellow", "purple", "orange", "magenta",
                "cyan", "lime", "pink", "crimson", "dark-purple", "dark-cyan", "gray", "navy", "fire"];
const INPUT_PATTERNS = {4:"[0-4]", 9:"[0-9]", 16:"[0-9]|1[0-6]"};

// Component Function
function Cell({ cellIndex, size, value, cellUpdateCallback, boardIndex, textVisibility, disabled }) {
    // Hooks to manage cell value
    const [inputValue, setInputValue] = useState("");
    const [displayValue, setDisplayValue] = useState(value);

    // Hook to manage input pattern (prevents unwated input values)
    const [inputPattern, setInputPattern] = useState(INPUT_PATTERNS[size]);
    
    // Hooks to manage cell color
    // Background Color
    const [cellBGColor, setCellBGColor] = useReducer(() => {
        if (textVisibility) {
            return "transparent";
        }
        return COLORS[displayValue];
    }, value);
    // Text Color
    const [cellTextColor, setCellTextColor] = useReducer(() => {
        if (displayValue === 0 || displayValue === "0") {
            return "transparent";
        }
        else if (textVisibility) {
            return COLORS[0];
        }
        return COLORS[displayValue];
    }, value);
    

    // Render display value on input update
    function handleNewInputValue(newValue) {
        // Clear input value unless expecting second digit
        if (size > 9) {
            setInputValue(newValue);
        }
        else {
            setInputValue("");
        }
        
        // Set the Display value (prevent value from being "")
        if (newValue === "") {
            setDisplayValue(0);
        }
        else {
            setDisplayValue(newValue);
        }
        // Update board state
        cellUpdateCallback(cellIndex, Number.parseInt(newValue));

        // Set cell colors
        setCellBGColor();
        setCellTextColor();
    }

    // Update Cell Color/text visibility
    useEffect(() => {
        setCellBGColor();
        setCellTextColor();
    }, [textVisibility]);

    // Set Input pattern on size change
    useEffect(() => {
        setInputPattern(INPUT_PATTERNS[size]);
    },[size]);


    return (
        <div className='cellContainer'>
            <p className={"cellDisplay size-"+size + " cell-text-"+cellTextColor}>{displayValue}</p>
            {/* Cell input element (Interactable) */}
            <input 
                type={'text'}
                className={"cell size-"+size+" cell-bg-"+cellBGColor}
                tabIndex={boardIndex}
                pattern={inputPattern}
                value={inputValue}
                disabled={disabled}
                onChange={(e) =>
                    handleNewInputValue(e.target.validity.valid ? e.target.value : 0)}
            />
        </div>
    );
}

export default Cell;