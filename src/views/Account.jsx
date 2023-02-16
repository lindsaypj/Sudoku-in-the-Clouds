import React from "react";
import Login from "../components/Login.jsx";
import NewUserForm from "../components/NewUserForm.jsx";

export default function Account({ token, setToken, newUser, setNewUser }) {

    // If user is not logged in, display login form
    if (!token) {
        if (newUser === true) {
            return <NewUserForm />
        }
        return <Login setToken={setToken} setNewUser={setNewUser} />;
    }

    return (
        <div>
            User's Account
        </div>
    );
}