// React Imports
import React, { useLayoutEffect, useState } from "react";

// Component Imports
import Loading from "../Loading";

// Class Imports
import { Theme } from "../../classes/Theme";
import { GameColor } from "../../classes/GameColor";


export default function ThemeSelector({ edit, setPageBGColor, setCellBGColor, setInfoTextColor, 
        setCellTextColor, setBoardBorderColor }) 
{

    // Get data from session if present
    let initialThemes = [];
    if (sessionStorage.getItem("themeNames") !== null && sessionStorage.getItem("themeNames") !== undefined) {
        initialThemes = JSON.parse(sessionStorage.getItem("themeNames"));
    }

    // Initialize Component State
    const [themeNames, setThemes] = useState(initialThemes);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Get available on load
    useLayoutEffect(() => {
        getThemes();
    }, []);

    // Function to get themes if not present in session
    function getThemes() {
        // Only request themes if they are not stored in Session
        if ((sessionStorage.getItem("themeNames") === null || sessionStorage.getItem("themeNames") === undefined) && !isLoading) {
            setIsLoading(true);
            const themesURI = "http://colormind.io/list/";
            const params = {
                method: "get",
                mode: "cors"
            }
            fetch(themesURI, params)
                .then((request) => {
                    setIsLoading(false);
                    if (request.ok) {
                        return request.json();
                    }
                    else {
                        setErrorMessage("Themes not available at this time");
                    }
                })
                .then((themesList) => {
                    if (Array.isArray(themesList.result)) {
                        setThemes(themesList.result);
                        sessionStorage.setItem("themeNames", JSON.stringify(themesList.result));
                    }
                    else {
                        setErrorMessage("Themes not found");
                        console.log(themesList.result);
                    }
                });
        }
    }

    // Function to get a theme using the theme name
    function getThemeByName(themeName) {
        const getThemeURI = "http://colormind.io/api/";
        const params = {
            method: "post",
            mode: "cors",
            body: JSON.stringify({
                "model": themeName
            })
        }

        fetch(getThemeURI, params)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    console.log("ERROR: "+response);
                }
            })
            .then((theme) => {
                const colors = theme.result;
                let newTheme = new Theme(new GameColor(colors[0]), new GameColor(colors[1]),
                    new GameColor(colors[4]), new GameColor(colors[3]), new GameColor(colors[2]));

                // Store theme
                sessionStorage.setItem(themeName, JSON.stringify(newTheme));

                setPageBGColor(newTheme.pageBGColor);
                setCellBGColor(newTheme.cellBGColor);
                setInfoTextColor(newTheme.infoTextColor);
                setCellTextColor(newTheme.cellTextColor);
                setBoardBorderColor(newTheme.boardBorderColor);
            })
    }


    ////   RENDERING METHODS   ////

    // Function to remove underscores and capitalize
    function parseTitle(themeTitle) {
        themeTitle = themeTitle.replaceAll("_", " ");
        // Capitalize first letter of each word SOURCE: https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript/196991#196991
        return themeTitle.replace(
            /\w\S*/g,
            function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
          );
    }

    // Function to update the styling of the page based on the given theme
    function updatePreferencesByTheme(selectedTheme) {
        // Check that selectedTheme is in list of available themes
        if (themeNames.includes(selectedTheme)) {
            // Check if array of saved themes exists
            if (sessionStorage.getItem(selectedTheme) !== null && sessionStorage.getItem(selectedTheme) !== undefined) {
                const sessionTheme = JSON.parse(sessionStorage.getItem(selectedTheme));
                // Check if session has selected theme stored
                setPageBGColor(new GameColor(sessionTheme.pageBGColor));
                setCellBGColor(new GameColor(sessionTheme.cellBGColor));
                setInfoTextColor(new GameColor(sessionTheme.infoTextColor));
                setCellTextColor(new GameColor(sessionTheme.cellTextColor));
                setBoardBorderColor(new GameColor(sessionTheme.boardBorderColor));
            }
            else {
                getThemeByName(selectedTheme);
            }
        }
        else {
            console.log("Theme not recognized");
        }
    }

    function renderThemesList() {
        if (isLoading) {
            return <Loading />
        }
        else {
            return (
            <>
                {errorMessage}
                {themeNames.map((theme, themeIndex) => {
                    if (theme !== "ui" && theme !== "default") {
                        return (
                            <button 
                                className={"btn btn-secondary m-1 shadow-sm"}
                                key={themeIndex}
                                disabled={!edit}
                                aria-disabled={!edit}
                                onClick={() => {updatePreferencesByTheme(theme)}}
                            >{parseTitle(theme)}</button>
                        );
                    }
                    return null;
                })}
            </>
            )   
        }
    }

    return (
        <div className="rounded p-3 mt-5">
            {/* Header */}
            <div>
                <h4 className="text-center">Daily Themes</h4>
            </div>
            <div className="text-center">
                {renderThemesList()} 
            </div>
        </div>
    );
}