import React from "react";
import Login from "../components/Login.jsx";
import NewUserForm from "../components/NewUserForm.jsx";

export default function Account({ user, setUser, newUser, setNewUser }) {

    // If user is not logged in, display login form
    if (user === null || user === undefined) {
        if (newUser === true) {
            return <NewUserForm setUser={setUser} setNewUser={setNewUser} />
        }
        return <Login setUser={setUser} setNewUser={setNewUser} />;
    }

    return (
        <div>
            User's Account
        </div>
    );
}