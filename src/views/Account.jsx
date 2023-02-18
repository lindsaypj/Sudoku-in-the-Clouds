import React from "react";
import Login from "../components/Login.jsx";
import NewUserForm from "../components/NewUserForm.jsx";

export default function Account({ token, setToken, user, setUser, newUser, setNewUser }) {

    // If user is not logged in, display login form
    if (token === null || token === undefined || token === "") {
        if (newUser === true) {
            return <NewUserForm setToken={setToken} setUser={setUser} setNewUser={setNewUser} />
        }
        return <Login setToken={setToken} setUser={setUser} setNewUser={setNewUser} />;
    }

    return (
        <div>
            User's Account
        </div>
    );
}