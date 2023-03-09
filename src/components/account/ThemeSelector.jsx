import React, { useLayoutEffect, useState } from "react";
import Loading from "../Loading";

export default function ThemeSelector({ edit }) {
    let initialThemes = [];
    if (sessionStorage.getItem("themes") !== null && sessionStorage.getItem("themes") !== undefined) {
        initialThemes = JSON.parse(sessionStorage.getItem("themes"));
    }
    const [themes, setThemes] = useState(initialThemes);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Get data on load
    useLayoutEffect(() => {
        getThemes();
    }, []);

    // Function to get themes if not present in session
    function getThemes() {
        // Only request themes if they are not stored in Session
        if ((sessionStorage.getItem("themes") === null || sessionStorage.getItem("themes") === undefined) && !isLoading) {
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
                        console.log(request);
                        return request.json();
                    }
                    else {
                        setErrorMessage("Themes not available at this time");
                    }
                })
                .then((themesList) => {
                    if (Array.isArray(themesList.result)) {
                        setThemes(themesList.result);
                        sessionStorage.setItem("themes", JSON.stringify(themesList.result));
                        console.log(themesList.result);
                    }
                    else {
                        setErrorMessage("Themes not found");
                        console.log(themesList.result);
                    }
                });
        }
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

    function renderThemesList() {
        if (isLoading) {
            return <Loading />
        }
        else {
            return (
            <>
                {errorMessage}
                {themes.map((theme, themeIndex) => {
                    if (theme !== "ui" && theme !== "default") {
                        return (
                            <button 
                                className={"btn btn-secondary m-1 shadow-sm"}
                                key={themeIndex}
                                disabled={!edit}
                                aria-disabled={!edit}
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
                <h4 className="text-center">Theme Selector</h4>
            </div>
            <div className="text-center">
                {renderThemesList()} 
            </div>
        </div>
    );
}