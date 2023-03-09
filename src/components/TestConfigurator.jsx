import React from "react";
import ShowNumBtn from "./buttons/ShowNumBtn";
import HideNumBtn from "./buttons/HideNumBtn";
import Form from 'react-bootstrap/Form';

import '.././styles/css/testconfigurator.css';



function TestConfigurator(props) {
        
    return (
        <div className="configurator-container ms-4">
            {/* Configuration Header */}
            <div>
                <h4 className="configurator-header mt-3 mb-0">Configure Board{props.numBoards > 1 && "s"}:</h4>
            </div>
            
            {/* BOARD SIZE */}
            <div className={"d-inline-block text-start mt-2 size-" + props.boardSize + "-selected"}>
                <p className="m-1 mb-0 text-start">Board Size:</p>
                <button 
                    className="btn m-1 d-inline btn-secondary shadow-sm fw-bold" 
                    onClick={() => props.setBoardSize(4)}
                >4x4</button>
                <button 
                    className="btn m-1 d-inline btn-secondary shadow-sm fw-bold" 
                    onClick={() => props.setBoardSize(9)}
                >9x9</button>
                <button 
                    className="btn m-1 d-inline btn-secondary shadow-sm fw-bold" 
                    onClick={() => props.setBoardSize(16)}
                >16x16</button>
            </div>

            {/* HIDE/SHOW NUMBERS */}
            <div className="mt-3 d-inline-block">
                <p className="m-1 mb-0 text-start">Cell Values:</p>
                <div className="d-inline me-2">
                    <ShowNumBtn 
                        theme={"btn-theme-light"} 
                        setHideNums={props.setHideNums}
                        hideNums={props.hideNums}
                    />
                </div>
                <div className="d-inline">
                    <HideNumBtn 
                        theme={"btn-theme-light"} 
                        setHideNums={props.setHideNums}
                        hideNums={props.hideNums}
                    />
                </div>
                
            </div>

            {/* NUMBER OF BOARDS */}
            <div className="m-1 mt-3 d-inline-block">
                <p className="mb-0">Number Of Boards: {props.numBoards}</p>
                <Form.Range
                    type="range"
                    className="form-range min-w-200"
                    min="1"
                    max="50"
                    step="1"
                    value={props.numBoards}
                    onChange={(e) => props.setNumBoards(Number.parseInt(e.target.value))}
                />
            </div>
        </div>
    );
}

export default TestConfigurator;