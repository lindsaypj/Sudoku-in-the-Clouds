import React, { useEffect, useState } from "react";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function Notification({ message, isError }) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [titleColor, setTitleColor] = useState("text-black");

    // Show notification when the message changes
    useEffect(() => {
        // If there is a message to show
        if (message !== "") {
            setShow(true);
            // If error message
            if (isError === true) {
                setTitle("ERROR");
                setTitleColor("text-danger");
            }
            // If message is not error
            else {
                setTitle("SUCCESS")
                setTitleColor("text-success");
            }
        }
        // No message to show
        else {
            setTitle("");
            setTitleColor("text-black");
        }
    }, [message, isError]);

    return (
        <ToastContainer className="p-4" position={'bottom-end'}>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
                <strong className={"me-auto "+titleColor}>{title}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}