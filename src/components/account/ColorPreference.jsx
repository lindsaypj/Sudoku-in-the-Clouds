import React from "react";

import { GameColor } from "../../classes/GameColor";

export default function ColorPreference({ colorObject, setColor, colorName, editing }) {

    // Function to convert a color object to color value

    return (
        <div className="d-flex align-items-center py-3">
            <input 
                type={"color"}
                className={"form-control form-control-color"}
                disabled={!editing}
                aria-disabled={!editing}
                value={colorObject.toHex()}
                onChange={(e) => {setColor(new GameColor(e.target.value))}} // new GameColor(e.target.value)
            />
            <p className="d-inline m-0 ps-2">{colorName}</p>
        </div>
    );
}