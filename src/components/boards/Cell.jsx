import React, { useReducer, useState } from 'react';
import { useEffect } from 'react';

import '../.././styles/css/cell.css'

// Static Constants
const COLORS = ["black", "blue", "red", "green", "yellow", "purple", "orange", "magenta",
                "cyan", "lime", "pink", "crimson", "dark-purple", "dark-cyan", "gray", "navy", "fire"];
const INPUT_PATTERNS = {4:"[0-4]", 9:"[0-9]", 16:"[0-9]|1[0-6]"};

// Component Function
function Cell(props) {
    // Hooks to manage cell value
    const [inputValue, setInputValue] = useState("");
    const [displayValue, setDisplayValue] = useState(props.value);

    // Hook to manage input pattern (prevents unwated input values)
    const [inputPattern, setInputPattern] = useState(INPUT_PATTERNS[props.size]);
    
    // Hooks to manage cell color
    // Background Color
    const [cellBGColor, setCellBGColor] = useReducer(() => {
        if (props.textVisibility) {
            return "transparent";
        }
        return COLORS[displayValue];
    }, props.value);
    // Text Color
    const [cellTextColor, setCellTextColor] = useReducer(() => {
        if (displayValue === 0 || displayValue === "0") {
            return "transparent";
        }
        else if (props.textVisibility) {
            return COLORS[0];
        }
        return COLORS[displayValue];
    }, props.value);
    

    // Render display value on input update
    function handleNewInputValue(newValue) {
        // Clear input value unless expecting second digit
        if (props.size > 9) {
            setInputValue(newValue);
        }
        else {
            setInputValue("");
        }
        
        // Set the return value
        setDisplayValue(newValue);
        setCellBGColor();
        setCellTextColor();
    }

    // Update Cell Color/text visibility
    useEffect(() => {
        setCellBGColor();
        setCellTextColor();
    }, [props.textVisibility]);

    // Set Input pattern on size change
    useEffect(() => {
        setInputPattern(INPUT_PATTERNS[props.size]);
    },[props.size]);


    return (
        <div className='cellContainer'>
            <p className={"cellDisplay size-"+props.size + " cell-text-"+cellTextColor}>{displayValue}</p>
            {/* Cell input element (Interactable) */}
            <input 
                type={'text'}
                className={"cell size-"+props.size+" cell-bg-"+cellBGColor}
                tabIndex={props.index+1}
                pattern={inputPattern}
                value={inputValue} 
                onChange={(e) =>
                    handleNewInputValue(e.target.validity.valid ? e.target.value : "")}
            />
            {/* Cell return value (Hidden) */}
            <input 
                type={"hidden"}
                className={"cell-return"}
                aria-hidden={true}
                name={"cells["+(props.index+1)+"]"}
                value={displayValue}
            />
        </div>
    );
}

export default Cell;