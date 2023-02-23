import React, { useState, useEffect } from "react";
import EditSaveCancelBtn from "../components/buttons/EditSaveCancelBtn.jsx";
import ColorPreference from "../components/account/ColorPreference.jsx";
import Login from "../components/forms/Login.jsx";
import NewUserForm from "../components/forms/NewUserForm.jsx";
import BoolSetting from "../components/account/BoolSetting.jsx";

import EditForm from "../components/forms/EditForm.jsx";
import DeleteConfirmation from "../components/menu/DeleteConfirmation.jsx";

export default function Account(
    { user, setUser, newUser, setNewUser, forcedLogin, setForcedLogin, setUserFromSession,
        setGlobalNotification, setIsGlobalError, returnAfterLogin, setReturnAfterLogin, setGameMode }) {
    
    // Form states
    const [editSettings, setEditSettings] = useState(false);

    // Account data states
    let initialShowConflits;
    if (user !== undefined && user !== null) {
        initialShowConflits = user.settings.showConflicts;
    }
    const [showConflicts, setShowConflicts] = useState(initialShowConflits);
    const [tempUser, setTempUser] = useState();
    const [deleteConfim, setDeleteConfim] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);

    // Error messages
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

    // Update Account data on user update
    useEffect(() => {
        if (user !== undefined && user !== null) {
            setShowConflicts(user.settings.showConflicts);
        }
    }, [user]);

    // Re-attempt to update user After forced Login (400 Bad Request)
    useEffect(() => {
        if (forcedLogin === false && tempUser !== null && tempUser !== undefined) {
            if (editSettings === true) {
                setUser(tempUser);
                setTempUser();
                setEditSettings(true);
                handleFormSave();
            }
        }
        else if (deleteUser === true) {
            handleDeleteUser();
        }
    }, [forcedLogin]);


    ////    COMPONENT ROUTING LOGIC    ////

    // If user is not logged in, display login form
    if (user === null || user === undefined || forcedLogin === true) {
        // Check for newUser flag (create acconut clicked)
        if (newUser === true) {
            // Render create account form
            return <NewUserForm 
                        setUser={setUser}
                        setNewUser={setNewUser}
                        returnAfterLogin={returnAfterLogin}
                        setReturnAfterLogin={setReturnAfterLogin}
                        setGameMode={setGameMode}
                    />
        }
        // Render login form
        return <Login
                    setUser={setUser}
                    setNewUser={setNewUser}
                    forcedLogin={forcedLogin}
                    setForcedLogin={setForcedLogin}
                    returnAfterLogin={returnAfterLogin}
                    setReturnAfterLogin={setReturnAfterLogin}
                    setGameMode={setGameMode}
                />;
    }


    ////    HTTP REQUEST LOGIC    ////

    // Function to save user account changes
    function handleFormSave() {
        let valid = true;

        // Validate User data
        if (showConflicts !== true && showConflicts !== false) {
            valid = false;
        }

        if (valid) {
            // Update user object with form data
            user.settings.showConflicts = showConflicts;

            const updateURI = "http://localhost:8080/sudoku/users/"+user.username;
            const params = {
                method: "put",
                mode: "cors",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            };

            // Make Fetch PUT request
            fetch(updateURI, params)
                .then((response) => {
                    if (response.ok) {
                        // User successfully updated
                        return response.json();
                    }
                    else if (response.status === 404) {
                        // User not found
                        console.log(response);
                    }
                    else if (response.status === 400) {
                        // Invalid User data or token. Request user login and retry
                        setTempUser(user);
                        setUser();
                        setForcedLogin(true);
                    }
                })
                .then(function (updatedUser) {
                    // Update Account state with User data from response
                    if (updatedUser !== null && updatedUser !== undefined) {
                        setUser(updatedUser);
                        sessionStorage.setItem('user', JSON.stringify(user));

                        setShowConflicts(updatedUser.settings.showConflicts);
                        setEditSettings(false);
                    }
                })
                .catch((response) => {
                    if (response instanceof TypeError) {
                        setFormErrorMessage("Network Error: failed to connect to server");
                    }
                });
        }
    }


    // Function to handle DELETE user request
    function handleDeleteUser() {
        setDeleteConfim(false);

        const deleteURI = "http://localhost:8080/sudoku/users/"+user.username;
        const params = {
            method: "delete",
            mode: "cors",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(deleteURI, params)
            .then((response) => {
                // Handle response
                if (response.ok) {
                    sessionStorage.clear();
                    setUser();
                    setTempUser();
                    setEditSettings(false);
                    setForcedLogin(false);
                    setDeleteUser(false);
                }
                else if (response.status === 400) {
                    setDeleteUser(true);
                    setForcedLogin(true);
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    setDeleteErrorMessage("Network Error: failed to connect to server");
                }
                else {
                    setDeleteErrorMessage("An error occured when trying to delete. Try again.")
                }
                
            })
    }


    ////    RENDERING LOGIC    ////

    // Function to get only the color properties of the user object
    function getColorPreferences() {
        const preferences = Object.keys(user.preferences);
        let colors = {
            "colors": [],
            "names": []
        };

        // Loop over prefernces and find colors
        for (let i = 0; i < preferences.length; i++) {
            if (preferences[i].includes("Color")) {
                // Store color object
                colors.colors.push(user.preferences[preferences[i]]);
                // Store property name
                colors.names.push(
                    preferences[i].charAt(0).toUpperCase() + // Capitalize
                    preferences[i].slice(1)
                    .replace("Color", "")       // Remove color
                    .replace(/([A-Z])/g, ' $1') // Add space between words
                );
            }
        }

        // Add Combine arrays
        for (let i = 0; i < colors.colors.length; i++) {
            colors.colors[i].name = colors.names[i];
        }
        return colors.colors;
    }

    // Form submition canceled, restore user data
    function handleFormCancel() {
        setUserFromSession(); // Restore user data
        setFormErrorMessage(""); // Clear error messages
        setEditSettings(false); // Switch from editing to viewing
    }


    ////    RENDER    ////

    return (
        <div className="container pb-5 mb-5">
            {/* Page Title */}
            <div className="row text-center py-4">
                <div className="col-12">
                    <h1>{user.username}'s Account</h1>
                    <h4>Rank: <span className="fw-bold">{user.userRank}</span></h4>
                </div>
            </div>
            
            {/* User Info */}
            <div className="row justify-content-center mb-5">
                {/* User Statistics */}
                <div className="col-11 col-md-8">
                    <h3>Player Stats</h3>
                    <p className="m-0">
                        <span className="fw-bold">{user.gamesWon.wins4x4}</span> 4x4 boards complete
                        </p>
                    <p className="m-0">
                        <span className="fw-bold">{user.gamesWon.wins9x9}</span> 9x9 boards complete
                    </p>
                    <p>
                        <span className="fw-bold">{user.gamesWon.wins16x16}</span> 16x16 boards complete
                    </p>
                    <p>
                        <span className="fw-bold">{user.totalGamesWon}</span> total boards complete
                    </p>
                </div>
            </div>

            {/* Settings */}
            <div className="row justify-content-center mb-5">
                <div className="col-11 col-md-8">
                    <EditForm editing={editSettings} errorMessage={formErrorMessage}>
                        {/* Header */}
                        <div className="row">
                            <div className="col-12">
                                <h3 className="d-inline pe-3">Settings</h3>
                                <EditSaveCancelBtn 
                                    editing={editSettings}
                                    setEditing={setEditSettings}
                                    handleSave={handleFormSave}
                                    handleCancel={handleFormCancel}
                                    styles={" align-top shadow-sm float-end"}
                                />
                                <hr></hr>
                            </div>
                        </div>

                        {/* Show Conflicts */}
                        <BoolSetting
                            setting={showConflicts}
                            setSetting={setShowConflicts}
                            name={"Show Conflicts"}
                            desc={"A conflict occurs when two cells in the same row, column, or group have the same value."}
                            editing={editSettings}
                        />
                    </EditForm>
                </div>
            </div>

            {/* Preferences */}
            <div className="row justify-content-center mb-5">
                <div className="col-11 col-md-8">
                    {/* Header */}
                    <div className="row">
                        <div className="col-12">
                            <h3 className="d-inline pe-3">Preferences</h3>
                            <EditSaveCancelBtn disabled={true} />
                            <hr></hr>
                        </div>
                    </div>
                    
                    {/* Colors */}
                    <div className="row">
                        <div className="col-12">
                            {getColorPreferences().map((color, colorIndex) => {
                                    return (
                                        <ColorPreference key={colorIndex} colorObject={color} colorName={color.name} />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete User */}
            <div className="row">
                <div className="col-12 text-center">
                    <button
                        type={"button"}
                        className="btn btn-danger"
                        onClick={() => {setDeleteConfim(true)}}
                    >
                        Delete Account
                    </button>
                    <span className="d-block text-danger">{deleteErrorMessage}</span>
                </div>
            </div>

            {/* Delete Confimation Modal */}
            <DeleteConfirmation
                show={deleteConfim}
                setShow={setDeleteConfim}
                handleDelete={handleDeleteUser} 
            />
        </div>
    );
}