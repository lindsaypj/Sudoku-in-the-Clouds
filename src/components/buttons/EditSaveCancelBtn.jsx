import React from "react";

export default function EditSaveCancelBtn({ editing, setEditing, handleSave, handleCancel, styles, disabled }) {
    
    if (disabled) {
        // EDIT DISABLED
        return (
            <button
                type="button"
                className="btn btn-secondary align-top shadow-sm float-end"
                disabled={true}
                aria-disabled={true}
            >Edit</button>
        );
    }

    if (!editing) {
        // EDIT
        return (
            <button
                type="button"
                className={"btn btn-primary"+styles}
                onClick={() => {setEditing(true)}}
            >Edit</button>
        );
    }
    else {
        // SAVE OR CANCEL
        return (
            <div className="d-inline">
                <button
                    type="button"
                    className={"btn btn-primary"+styles}
                    onClick={() => {handleSave()}}
                >Save</button>

                <button
                    type="button"
                    className={"btn btn-secondary mx-2"+styles}
                    onClick={() => {handleCancel(setEditing)}}
                >Cancel</button>
            </div>
        );
    }
}