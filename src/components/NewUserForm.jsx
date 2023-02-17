import React, { useState, useReducer } from "react";

import ShowNumBtn from "./buttons/ShowNumBtn";
import HideNumBtn from "./buttons/HideNumBtn";

export default function NewUserForm() {
    // Form fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showConflicts, setShowConflicts] = useReducer((current) => {return !current}, false);
    const [hideNums, setHideNums] = useState(false);

    // Validation Messages
    const [usernameError, setUsernameError] = useReducer(() => {
        if (username.length < 3 || username.length > 20) {
            return "Username must be 4-20 characters";
        }
        else {
            return "";
        }
    }, "");
    const [passwordError, setPasswordError] = useReducer(() => {
        if (password.length < 6) {
            return "Password must be at least 7 characters";
        }
        else {
            return "";
        }
    }, "");


    // Function to handle the form submition
    function handleNewUser(event) {
        // Don't reload
        event.preventDefault();


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
                        
                            <div className="row">
                                {/* USERNAME */}
                                <div className="col-6">
                                    <label className="form-label pe-2">Username
                                    <input
                                        className="form-control border-0 shadow-sm"
                                        type={"text"}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={() => setUsernameError()}
                                    />
                                    </label>
                                </div>

                                {/* PASSWORD */}
                                <div className="col-6">
                                    <label className="form-label ps-2">Password
                                    <input
                                        className="form-control border-0 shadow-sm"
                                        type={"text"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                            

                            


                            <hr className="mb-5"></hr>
                        </fieldset>

                        <fieldset className="container-fluid p-0">
                            <legend>Game Options</legend>

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
                            
                            <hr className="mb-5"></hr>
                        </fieldset>

                        <fieldset className="mb-5 container-fluid p-0">
                            <legend>Preferences</legend>

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
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );
}