import React from "react";
import Login from "../components/Login.jsx";

export default function Account({ token, setToken }) {

    if (!token) {
        return <Login setToken={setToken} />;
    }

    return (
        <div>
            User's Account
        </div>
    );
}