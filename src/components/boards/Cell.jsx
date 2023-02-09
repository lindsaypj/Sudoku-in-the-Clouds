import React, { useState } from 'react';
import { useEffect } from 'react';

import '../.././styles/css/cell.css'

// Static Constants
const colors = ["black", "blue", "red", "green", "yellow", "purple", "orange", "magenta",
                "cyan", "lime", "pink", "crimson", "dark-purple", "dark-cyan", "gray", "navy", "fire"];
const inputPatterns = {4:"[0-4]", 9:"[0-9]", 16:"[0-9]|1[0-6]"};

function Cell(props) {
    // Hook to manage state of cell value
    const [cellValue, setCellValue] = useState(props.value);
    // Hook to manage input pattern (prevents unwated input values)
    const [inputPattern, setInputPattern] = useState(inputPatterns[props.size]);
    // Hooks to manage cell color
    const [cellColor, setCellColor] = useState(colors[0]);
    const [inputValue, setInputValue] = useState("");
    const [displayValue, setDisplayValue] = useState(cellValue);


    // Prevent "0" from rendering
    useEffect(() => {
        if (cellValue === 0 || cellValue === "0") {
            setCellValue("");
            setDisplayValue("");
        }
    },[cellValue]);

    // Manage Cell Color
    useEffect(() => {
        if (props.textVisibility) {
            setCellColor(colors[cellValue]);
            
            if (props.size === 16) {
                setInputValue(cellValue);
            }
            else {
                setInputValue("");
                setDisplayValue("");
            }
        }
        else {
            setCellColor(colors[0]);
            if (props.size === 16) {
                setInputValue(cellValue);
            }
            else {
                setInputValue("");
                setDisplayValue(cellValue);
            }
        }
    }, [props.textVisibility, cellValue]);

    // Set Input pattern on size change
    useEffect(() => {
        setInputPattern(inputPatterns[props.size]);
    },[props.size]);


    return (
        <div className='cellContainer'>
            <p className={"cellDisplay size-"+props.size + " cell-text-"+cellColor}>{displayValue}</p>
            <input 
                type={'text'}
                className={"cell size-"+props.size+" cell-bg-"+cellColor +" cell-text-"+cellColor}
                tabIndex={props.index+1}
                pattern={inputPattern}
                value={inputValue} 
                onChange={(e) =>
                    setCellValue((newValue) => (e.target.validity.valid ? e.target.value : newValue))} 
            />
        </div>
    );
}

export default Cell;