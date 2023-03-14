import React from "react";

export default function LoginLogoutBtn({className, user, setUser, GameModes, setGameMode, setNewUser}) {

    if (user !== null && user !== undefined) {
        return (
            <button
                className={className}
                type={"button"}
                onClick={() => {
                    sessionStorage.clear();
                    setUser(null);
                    sessionStorage.setItem('gameMode', "");
                    setGameMode("");
                }}
            >Logout</button>
        );
    }
    else {
        return (
            <button 
                className={className}
                type={"button"}
                onClick={() => {
                    setNewUser(false);
                    sessionStorage.setItem('gameMode', GameModes.Account);
                    setGameMode(GameModes.Account);
                }}
            >Login</button>
        );
    }
}