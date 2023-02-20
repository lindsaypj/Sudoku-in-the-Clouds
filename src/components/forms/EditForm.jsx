import React from "react";

import "../../styles/css/EditForm.css";

export default function EditForm({ handleSubmit, classNames, children, editing, errorMessage }) {

    // Function to apply editing styles
    function getFormClasses() {
        const otherClasses = classNames !== undefined ? " " + classNames : "";

        if (editing) {
            return "edit-form"+otherClasses;
        }
        return otherClasses;
    }
    
    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault()}
            } 
            className={getFormClasses()} 
        >
            {children}
            <span className="d-block text-danger">{errorMessage}</span>
        </form>
    );
}