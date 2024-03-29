import React, { useReducer, useState } from 'react';
import { useEffect, useLayoutEffect, useCallback } from 'react';

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

    useLayoutEffect(() => {
        setDisplayValue(value);
        setCellBGColor();
        setCellTextColor();
    }, [value]);

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
            if (disabled) {
                return "disabled";
            }
            return "default";
        }
        return COLORS[displayValue];
    }, value);
    

    // Render display value on input update
    function handleNewInputValue(newValue) {
        // Clear input value unless expecting second digit
        if (size > 9) {
            if (newValue === "0" || newValue === 0) {
                setInputValue("");
            }
            else {
                setInputValue(newValue);
            }
        }
        else {
            setInputValue("");
        }
        
        // Set the Display value (prevent value from being "")
        if (newValue === 0 || newValue === "") {
            setDisplayValue(0);
            // Update board state
            cellUpdateCallback(cellIndex, 0);
        }
        else {
            setDisplayValue(newValue);
            // Update board state
            cellUpdateCallback(cellIndex, Number.parseInt(newValue));
        }

        // Set cell colors
        setCellBGColor();
        setCellTextColor();
    }

    // Update Cell Color/text visibility
    useLayoutEffect(() => {
        setCellBGColor();
        setCellTextColor();
    }, [textVisibility, displayValue]);

    // Set Input pattern on size change
    useEffect(() => {
        setInputPattern(INPUT_PATTERNS[size]);
    },[size]);


    // CELL FOCUS/BLUR HANDLERS
    const handleBackspace = useCallback((event) => {
        // Handle deleteing input value
        if (event.key === "Backspace" || event.key === "Delete") {
            setInputValue(0);
        }
    }, []);

    function onCellFocus(event) {
        document.addEventListener('keydown', handleBackspace, false);
    }

    function onCellBlur(event) {
        document.removeEventListener('keydown', handleBackspace, false);
    }

    return (
        <div className='cellContainer'>
            <p className={"cellDisplay size-"+size + " cell-text-"+cellTextColor}>{displayValue}</p>
            {/* Cell input element (Interactable) */}
            <input 
                type={'text'}
                className={"cell size-"+size+" cell-bg-"+cellBGColor+ " cell-text-transparent"}
                tabIndex={boardIndex}
                pattern={inputPattern}
                value={inputValue}
                onFocus={onCellFocus}
                onBlur={onCellBlur}
                onChange={(e) => {
                    if (!disabled) {
                        handleNewInputValue(e.target.validity.valid ? e.target.value : inputValue);
                    }   
                }}
            />
        </div>
    );
}

export default Cell;