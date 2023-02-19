import React from "react";

export default function ColorPreference({ colorObject, colorName }) {

    // Function to convert a color object to color value
    function getColor(color) {
        const red = color.red.toString(16);
        const green = color.green.toString(16);
        const blue = color.blue.toString(16);

        return "#"+red+green+blue;
    }

    return (
        <div className="d-flex align-items-center py-3">
            <input 
                type={"color"}
                className={"form-control form-control-color"}
                disabled={true}
                aria-disabled={true}
                value={getColor(colorObject)}
            />
            <p className="d-inline m-0 ps-2">{colorName}</p>
        </div>
    );
}