import React, { useState } from "react";

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    // Attempt to login
    // GET @ /sudoku/users/username
    function loginAttempt(event) {
        // Prevent reload
        event.preventDefault();
        
        // Validate credentials
        if (username.length < 4 || username.length > 20 || password.length < 7) {
            setErrorMessage("Username or password is invalid");
            return;
        }        

        const loginURI = "http://localhost:8080/sudoku/users/"+username+"?token="+password;
        const params = {
            method: "get",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(loginURI, params)
        .then(function (response) {
            if (response.ok) {
                setErrorMessage("");
                return response.json();
            }
            else {
                if (response.status === 400 || response.status === 404) {
                    setErrorMessage("Username or password is invalid");
                    setPassword("");
                }
            }
        })
        .then(function (loggedInUser) {
            if (loggedInUser !== null && loggedInUser !== undefined) {
                props.setUser(loggedInUser);
                props.setNewUser(false);
                props.setForcedLogin(false);
                sessionStorage.setItem('user', JSON.stringify(loggedInUser));
                props.updateUserData(loggedInUser);

                if (props.returnAfterLogin !== undefined && props.returnAfterLogin !== null && props.returnAfterLogin !== "") {
                    props.setGameMode(props.returnAfterLogin);
                    props.setReturnAfterLogin();
                }
            }
        })
        .catch((error) => {
            if (error instanceof TypeError) {
                setErrorMessage("Network Error: failed to connect to server");
            }
        });
    }

    return (
        <div className="text-center mt-5 container-fluid">
            <div className="row">
                {/* LOGIN FORM */}
                <div className="col-12 col-md-1"></div>
                <div className="col-12 col-md-6">
                    <h2 className="mb-4">Please Log In</h2>
                    <form onSubmit={(e) => {loginAttempt(e)}}>
                        <div className="d-block m-2">
                            <label>
                                <input 
                                    type={"text"}
                                    className="form-control border-0"
                                    value={username}
                                    onChange={(e) => {setUsername(e.target.value)}}
                                    placeholder="Username" 
                                />
                            </label>
                        </div>
                        <div className="d-block m-2">
                            <label>
                                <input
                                    type={"password"}
                                    className="form-control border-0"
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    placeholder="Password" 
                                />
                            </label>
                        </div>
                        
                        <div>
                            <span className="d-block text-danger">{errorMessage}</span>
                            <button type="submit" className="btn mt-3 btn-primary">Login</button>
                        </div>
                    </form>
                </div>

                {/* CREATE ACCOUNT INFO */}
                <div className="col-12 col-md-4 mt-md-0 mt-5">
                    <div className="shadow-sm p-3 mx-3 mx-md-0 bg-white rounded">
                        <h4>Don't have an account?</h4>
                        <p className="px-3">
                            With a free account, you can track your solving progress, personalize 
                            your game with customizable themes, and conveniently remember your game
                            preferences. Sign up today to take your Sudoku skills to the next level!
                        </p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => props.setNewUser(true)}
                        >Create Account</button>
                    </div>
                </div>
                <div className="col-12 col-md-1"></div>
            </div>
            
        </div>
    );
}