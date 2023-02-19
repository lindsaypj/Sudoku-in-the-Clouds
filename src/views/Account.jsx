import React from "react";
import ColorPreference from "../components/ColorPreference.jsx";
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

    // Function to get only the color properties of the user object
    function getColors() {
        const preferences = Object.keys(user.preferences);
        let colors = {
            "colors": [],
            "names": []
        };

        // Loop over prefernces and find colors
        for (let i = 0; i < preferences.length; i++) {
            if (preferences[i].includes("Color")) {
                colors.colors.push(user.preferences[preferences[i]]);
                colors.names.push(
                    preferences[i].charAt(0).toUpperCase() + // Capitalize
                    preferences[i].slice(1)
                    .replace("Color", "") // Remove color
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
                    {/* Header */}
                    <div className="row">
                        <div className="col-12">
                            <h3 className="d-inline pe-3">Settings</h3>
                            <button
                                type="button"
                                className="btn btn-primary align-top shadow-sm float-end"
                                onClick={() => {}}
                            >Edit</button>
                            <hr></hr>
                        </div>
                    </div>    

                    {/* Show Conflicts */}
                    <div className="row">
                        {/* Description */}
                        <div className="col-12 col-md-6">
                            <p>
                                Show Conflicts: <span className="fw-bold">{String(user.settings.showConflicts)}</span>
                            </p>
                            <p>
                                A conflict occurs when two cells in the same row, column,
                                or group have the same value.
                            </p>
                        </div>
                        {/* Image examples */}
                        <div className="col-12 col-md-6">

                        </div>
                    </div>
                    
                </div>
            </div>

            {/* Preferences */}
            <div className="row justify-content-center mb-5">
                <div className="col-11 col-md-8">
                    {/* Header */}
                    <div className="row">
                        <div className="col-12">
                            <h3 className="d-inline pe-3">Preferences</h3>
                            <button
                                type="button"
                                className="btn btn-secondary align-top shadow-sm float-end"
                                disabled={true}
                                aria-disabled={true}
                            >Edit</button>
                            <hr></hr>
                        </div>
                    </div>
                    
                    {/* Colors */}
                    <div className="row">
                        <div className="col-12">
                            {getColors().map((color, colorIndex) => {
                                    return (
                                        <ColorPreference key={colorIndex} colorObject={color} colorName={color.name} />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}