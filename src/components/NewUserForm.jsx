import React, { useState, useReducer } from "react";

import ShowNumBtn from "./buttons/ShowNumBtn";
import HideNumBtn from "./buttons/HideNumBtn";

export default function NewUserForm({ setUser, setNewUser }) {
    // Form fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showConflicts, setShowConflicts] = useReducer((current) => {return !current}, false);
    const [hideNums, setHideNums] = useState(false);

    // Validation Messages
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [globalError, setGlobalError] = useState("");


    // Function to handle the form submition
    function handleNewUser(event) {
        // Don't reload
        event.preventDefault();
        
        // Validate fields
        let validity = validateInputs();

        // Create User object
        const newUser = createUserObject();

        // Create Fetch POST request for New User
        if (validity) {
            const createUserURI = "http://localhost:8080/sudoku/users/"+username;
            const params = {
                method: "post",
                mode: "cors",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            // Make fetch call
            fetch(createUserURI, params)
            .then(function(response) {
                if (response.ok) {
                    setGlobalError("");
                    return response.json();
                }
                else {
                    if (response.status === 400) {
                        setUsernameError("Username unavailable");
                    }
                }
            })
            .then(function(user) {
                if (user !== null && user !== undefined) {
                    setUser(user);
                    setNewUser(false);
                    
                    // Store User in Session
                    sessionStorage.setItem('user', JSON.stringify(user));
                }
            })
            // Render error if no other error detected
            .catch(() => {
                if (usernameError === "") {
                    setGlobalError("ERROR: internal error, try again"); 
                }
            });
        }

    }

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                    {/* Header */}
                    <h2 className="text-center mb-4">Create Account</h2>

                    {/* Account Creation Form */}
                    <form onSubmit={(e) => handleNewUser(e)} className="px-2" id="newUserForm">

                        <fieldset className="container-fluid p-0">
                            <legend>Login Information</legend>
                            <hr></hr>
                        
                            <div className="row">
                                {/* USERNAME */}
                                <div className="col-6">
                                    <label className="form-label">Username
                                    <input
                                        className="form-control border-0 shadow-sm"
                                        type={"text"}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value.trim())}
                                    />
                                    </label>
                                </div>

                                {/* PASSWORD */}
                                <div className="col-6">
                                    <label className="form-label">Password
                                    <input
                                        className="form-control border-0 shadow-sm"
                                        type={"password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value.trim())}
                                        onBlur={() => setPasswordError()}
                                    />
                                    </label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <p className="d-block text-danger">{usernameError}</p>
                                </div>
                                <div className="col-6">
                                    <p className="d-block text-danger">{passwordError}</p>
                                </div>
                            </div>
                            
                        </fieldset>

                        <fieldset className="container-fluid mt-4 p-0">
                            <legend>Game Options</legend>
                            <hr></hr>

                            {/* Show Conflicts */}
                            <div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input border-0 shadow-sm"
                                        type={"checkbox"}
                                        id={"show-conflict-input"}
                                        onChange={() => setShowConflicts(showConflicts)}
                                    />
                                    <label htmlFor="show-conflict-input" className="form-check-label">Highlight Conflicts</label>
                                </div>
                                <div>
                                    EXAMPLE IMAGE
                                </div>
                            </div>
                            
                        </fieldset>

                        <fieldset className="my-5 container-fluid p-0">
                            <legend>Preferences</legend>
                            <hr></hr>

                            {/* HIDE/SHOW NUMBERS */}
                            <div className="mt-3 d-inline-block">
                                <p className="bg-light m-0 text-start">Cell values</p>
                                <div className="d-inline me-2">
                                    <ShowNumBtn 
                                        theme={"btn-theme-light"} 
                                        setHideNums={setHideNums}
                                        hideNums={hideNums}
                                    />
                                </div>
                                <div className="d-inline">
                                    <HideNumBtn 
                                        theme={"btn-theme-light"} 
                                        setHideNums={setHideNums}
                                        hideNums={hideNums}
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {/* Submit button */}
                        <div className="text-center mb-5">
                            <span className="d-block text-danger">{globalError}</span>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );

    function validateInputs() {
        let validity = true;
        if (password.replace(/\s+/g, '').length < 7) {
            validity = false;
            setPasswordError("Password must be at least 7 characters");
        }
        else {
            setPasswordError("");
        }
        if (username.replace(/\s+/g, '').length < 4 || username.replace(/\s+/g, '').length > 20) {
            validity = false;
            setUsernameError("Username must be 4-20 characters long");
        }
        else {
            setUsernameError("");
        }
        if (showConflicts !== true && showConflicts !== false) {
            validity = false;
            console.log("ERROR: Incorrect datatype");
        }
        if (hideNums !== true && hideNums !== false) {
            validity = false;
            console.log("ERROR: Incorrect datatype");
        }
        return validity;
    }

    function createUserObject() {
        return {
            username: username,
            token: password,
            gamesWon: {
                "wins4x4": 0,
                "wins9x9": 0,
                "wins16x16": 0
            },
            totalGamesWon: 0,
            userRank: "STRATUS",
            preferences: {
                "pageBackgroundColor": {
                    "red": 192,
                    "green": 192,
                    "blue": 192,
                    "transparency": 1
                },
                "boardCellColor": {
                    "red": 255,
                    "green": 255,
                    "blue": 255,
                    "transparency": 1
                },
                "infoTextColor": {
                    "red": 0,
                    "green": 0,
                    "blue": 0,
                    "transparency": 1
                },
                "boardTextColor": {
                    "red": 0,
                    "green": 0,
                    "blue": 0,
                    "transparency": 1
                },
                "boardBorderColor": {
                    "red": 0,
                    "green": 0,
                    "blue": 0,
                    "transparency": 1
                },
                "infoFont": "Roboto, sans-serif",
                "boardFont": "Roboto, sans-serif"
            },
            settings: {
                "showConflicts": showConflicts
            }
        }
    }
}