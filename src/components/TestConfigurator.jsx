import React from "react";
import { useEffect, useState } from "react";
import '.././css/testconfigurator.css';


function TestConficurator(props) {
    const [textVisibilityMessage, setTextVisibilityMessage] = useState("Hide Numbers");

    // Update Text Visibility Message
    useEffect(() => {
        if (props.hideNums) {
            setTextVisibilityMessage("Show Numbers");
        }
        else {
            setTextVisibilityMessage("Hide Numbers");
        }
    }, [props.hideNums]);
    return (
        <div className="configurator-container">
            <button onClick={() => props.setBoardSize(4)}>4x4</button>
            <button onClick={() => props.setBoardSize(9)}>9x9</button>
            <button onClick={() => props.setBoardSize(16)}>16x16</button>
            <button onClick={() => props.setHideNums(!props.hideNums)}>{textVisibilityMessage}</button>
            <h4>Number Of Boards:</h4>
            <input type={"number"} value={props.numBoards} onChange={(e) => props.setNumBoards(e.target.value)}></input>
        </div>
    );
}

export default TestConficurator;