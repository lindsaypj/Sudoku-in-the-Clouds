import React, { useReducer } from "react";
import { useEffect, useState } from "react";
import ShowNumBtn from "./buttons/ShowNumBtn";
import HideNumBtn from "./buttons/HideNumBtn";

import '.././styles/css/testconfigurator.css';



function TestConfigurator(props) {
        
    return (
        <div className="configurator-container ms-5">
            {/* MENU */}
            <div className="text-start m-1 mt-5">
                <button 
                    className="btn bg-secondary text-white shadow-sm"
                    onClick={() => props.setMenuVisibility(true)}
                >Menu</button>
            </div>
            
            {/* BOARD SIZE */}
            <div className={"bg-light text-start mt-3 size-" + props.boardSize + "-selected"}>
                <p className="bg-light m-1 mb-0 text-start">Board Size:</p>
                <button 
                    className="btn m-1 d-inline btn-theme-light shadow-sm fw-bold" 
                    onClick={() => props.setBoardSize(4)}
                >4x4</button>
                <button 
                    className="btn m-1 d-inline btn-theme-light shadow-sm fw-bold" 
                    onClick={() => props.setBoardSize(9)}
                >9x9</button>
                <button 
                    className="btn m-1 d-inline btn-theme-light shadow-sm fw-bold" 
                    onClick={() => props.setBoardSize(16)}
                >16x16</button>
            </div>

            {/* HIDE/SHOW NUMBERS */}
            <div className="mt-3">
                <p className="bg-light m-1 mb-0 text-start">Cell Values:</p>
                <div className="d-inline me-2">
                    <ShowNumBtn 
                        theme={"btn-theme-light"} 
                        setHideNums={props.setHideNums}
                        hideNums={props.hideNums}
                    />
                </div>
                <HideNumBtn 
                    theme={"btn-theme-light"} 
                    setHideNums={props.setHideNums}
                    hideNums={props.hideNums}
                />
            </div>

            {/* NUMBER OF BOARDS */}
            <div className="bg-light m-1 mt-3">
                <p className="bg-light mb-0">Number Of Boards:</p>
                <input 
                className="shadow-sm"
                type={"number"} 
                value={props.numBoards} 
                onChange={(e) => props.setNumBoards(e.target.value)}></input>
            </div>
        </div>
    );
}

export default TestConfigurator;